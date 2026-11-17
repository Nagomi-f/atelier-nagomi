// This project's SCSS uses top-level color variables and standard CSS.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
const source = readFileSync(new URL("./scss/style.scss", import.meta.url), "utf8");
const colors = new Map();
const css = source.replace(/^\$([\w-]+):\s*(#[\da-f]+);\s*$/gim, (_, key, value) => {
  colors.set(key, value);
  return "";
}).replace(/#\{\$([\w-]+)\}/g, (_, key) => {
  if (!colors.has(key)) throw new Error("Unknown color: " + key);
  return colors.get(key);
});
mkdirSync(new URL("./css/", import.meta.url), { recursive: true });
writeFileSync(new URL("./css/style.css", import.meta.url), css.trimStart());


