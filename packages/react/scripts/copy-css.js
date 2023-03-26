// @ts-check

import { resolve, join } from "node:path";
import { promises as fs } from "node:fs";
import { createRequire } from "node:module";

async function main() {
    const require = createRequire(import.meta.url);
    const input = require.resolve("@melloware/coloris/dist/coloris.css");
    
    const dirname = resolve(new URL(import.meta.url).pathname, "..");
    const outputDir = resolve(dirname, "..", "dist", "bundle");
    const output = join(outputDir, "coloris.css");

    console.log(`Copying CSS <${input}> to dist directory <${outputDir}>`);
    fs.mkdir(outputDir, { recursive: true });
    await fs.copyFile(input, output);
}

main().catch(e => console.error("Unexpected error", e));