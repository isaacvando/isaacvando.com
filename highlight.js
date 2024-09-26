#!/usr/bin/env node

import hljs from "highlight.js";
import hljsRoc from "highlightjs-roc";
import { marked } from "marked";
import { JSDOM } from "jsdom";

hljs.registerLanguage("roc", hljsRoc);

// Read input from stdin
let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  const html = marked(input);

  const dom = new JSDOM(html, { contentType: "text/html;charset=utf-8" });
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
