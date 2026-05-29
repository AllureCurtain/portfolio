import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const chromePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:3100/";
const debuggingPort = Number(process.env.CHROME_DEBUG_PORT ?? 9223);

const viewports = [
  {
    name: "desktop",
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  },
  {
    name: "mobile",
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  },
];

await mkdir("artifacts", { recursive: true });

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--disable-extensions",
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${process.cwd()}\\.chrome-visual-check`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

try {
  const webSocketDebuggerUrl = await getPageDebuggerUrl(debuggingPort);

  for (const viewport of viewports) {
    const client = await createCdpClient(webSocketDebuggerUrl);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", viewport);
    await client.send("Page.navigate", { url: baseUrl });
    await waitForLoad(client);
    await waitForExperience(client);

    const screenshot = await client.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    await writeBase64File(`artifacts/${viewport.name}-home-cdp.png`, screenshot.data);
    client.close();
  }
} finally {
  chrome.kill();
}

async function getPageDebuggerUrl(port) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/new?${baseUrl}`, {
        method: "PUT",
      });
      if (response.ok) {
        const data = await response.json();
        return data.webSocketDebuggerUrl;
      }
    } catch {
      await wait(250);
    }
  }

  throw new Error("Chrome DevTools endpoint did not become ready");
}

async function createCdpClient(url) {
  const socket = new WebSocket(url);
  const pending = new Map();
  let nextId = 1;

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id) return;

    const callbacks = pending.get(message.id);
    if (!callbacks) return;

    pending.delete(message.id);

    if (message.error) {
      callbacks.reject(new Error(message.error.message));
    } else {
      callbacks.resolve(message.result);
    }
  });

  return {
    close() {
      socket.close();
    },
    send(method, params = {}) {
      const id = nextId++;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    },
  };
}

async function waitForLoad(client) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const result = await client.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });

    if (result.result.value === "complete") return;
    await wait(100);
  }

  throw new Error("Page did not finish loading");
}

async function waitForExperience(client) {
  const deadline = Date.now() + 12_000;
  let lastValue;

  while (Date.now() < deadline) {
    const result = await client.send("Runtime.evaluate", {
      expression: `
        (() => {
          const loader = document.querySelector('[data-loader]');
          const experience = document.querySelector('[data-portfolio-experience]');
          return {
            loaderGone: !loader,
            experienceVisible: Boolean(experience && getComputedStyle(experience).opacity === '1'),
            opacity: experience ? getComputedStyle(experience).opacity : null,
            hasExperience: Boolean(experience),
            text: document.body.innerText
          };
        })()
      `,
      returnByValue: true,
    });

    const value = result.result.value;
    lastValue = value;
    if (
      value.loaderGone &&
      value.experienceVisible &&
      value.text.replace(/\u00a0/g, " ").includes("Portfolio Owner")
    ) {
      return;
    }

    await wait(250);
  }

  throw new Error(
    `Portfolio experience did not become visible: ${JSON.stringify(lastValue)}`
  );
}

async function writeBase64File(path, data) {
  const { writeFile } = await import("node:fs/promises");
  await writeFile(path, Buffer.from(data, "base64"));
  console.log(path);
}
