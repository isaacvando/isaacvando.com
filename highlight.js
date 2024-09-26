#!/usr/bin/env node

import hljs from "highlight.js";
import hljsRoc from "highlightjs-roc";
import { createInterface } from "readline";
import { JSDOM } from "jsdom";

hljs.registerLanguage("roc", hljsRoc);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let input = "";

rl.on("line", (line) => {
  input += line + "\n";
});

rl.on("close", () => {
  const dom = new JSDOM(input);
  const document = dom.window.document;

  const codeBlocks = document.querySelectorAll("pre code.language-roc");

  codeBlocks.forEach((block) => {
    const highlightedCode = hljs.highlight(block.textContent, {
      language: "roc",
    }).value;
    block.innerHTML = highlightedCode;
  });

  process.stdout.write(dom.serialize());
});
