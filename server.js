const http = require("node:http");
const { timingSafeEqual } = require("node:crypto");
const { readFileSync } = require("node:fs");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const htmlPath = path.join(__dirname, "public", "index.html");

try {
  const localEnv = readFileSync(path.join(__dirname, ".env"), "utf8");
  for (const line of localEnv.split(/\r?\n/)) {
    const entry = line.trim();
    if (!entry || entry.startsWith("#")) continue;
    const separator = entry.indexOf("=");
    if (separator < 1) continue;

    const name = entry.slice(0, separator).trim();
    let value = entry.slice(separator + 1).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || process.env[name] !== undefined) continue;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[name] = value;
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(data));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    try {
      const html = await readFile(htmlPath);
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Frame-Options": "SAMEORIGIN"
      });
      response.end(html);
    } catch (error) {
      console.error("Unable to read public/index.html:", error);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Unable to load the portal.");
    }
    return;
  }

  if (url.pathname === "/api/unlock" && request.method === "POST") {
    const configuredPassword = process.env.PAYMENT_DETAILS_PASSWORD;
    if (!configuredPassword) {
      sendJson(response, 503, { error: "Payment details are disabled. Configure PAYMENT_DETAILS_PASSWORD on the server." });
      request.resume();
      return;
    }

    let body = "";
    request.setEncoding("utf8");
    let bodyTooLarge = false;
    request.on("data", chunk => {
      if (bodyTooLarge) return;
      body += chunk;
      if (body.length > 1024) {
        bodyTooLarge = true;
        sendJson(response, 413, { error: "Request is too large." });
        request.resume();
      }
    });
    request.on("end", () => {
      if (response.writableEnded || bodyTooLarge) return;
      let submittedPassword;
      try {
        submittedPassword = JSON.parse(body)?.password;
      } catch {
        sendJson(response, 400, { error: "Invalid request." });
        return;
      }

      if (typeof submittedPassword !== "string" || submittedPassword.length > 256) {
        sendJson(response, 400, { error: "Invalid password." });
        return;
      }

      const submitted = Buffer.from(submittedPassword);
      const configured = Buffer.from(configuredPassword);
      const matches = submitted.length === configured.length && timingSafeEqual(submitted, configured);
      sendJson(response, matches ? 200 : 401, matches ? { unlocked: true } : { error: "Incorrect password. Please try again." });
    });
    return;
  }

  if (url.pathname === "/api/unlock") {
    response.writeHead(405, { Allow: "POST", "Content-Type": "text/plain; charset=utf-8" });
    response.end("Method not allowed.");
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found.");
});

server.on("error", error => {
  console.error("Unable to start Node.js server:", error);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Portal running at http://${host}:${port}`);
});
