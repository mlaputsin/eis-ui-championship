import { createServer, IncomingMessage } from "node:http";
import { strict as assert } from "node:assert";
import { exec } from "node:child_process";

import { getFirstEl } from "./challenge";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  try {
    assert.deepEqual(getFirstEl([[[1, 2, 3]], 4, 5]), [[1, 2, 3]]);
    res.end(buildHtml(req, getTestResultView("Success")));
  } catch {
    res.end(buildHtml(req, getTestResultView("Fail")));
  }
});

server.listen(port, hostname, () => {
  const url = `http://${hostname}:${port}/`;
  exec(`open ${url}`);
  console.log("You can now view your results");
});

function getTestResultView(result: "Success" | "Fail") {
  return `<div>${result}</div>`;
}

function buildHtml(req: IncomingMessage, body: string) {
  const header = "";

  return (
    "<!DOCTYPE html>" +
    "<html><head>" +
    header +
    "</head><body>" +
    body +
    "</body></html>"
  );
}
