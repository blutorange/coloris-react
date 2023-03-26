// @ts-check

import { resolve } from "node:path";
import { promises as fs } from "node:fs";

async function main() {
    const dirname = resolve(new URL(import.meta.url).pathname, "..");
    const dist = resolve(dirname, "..", "dist");

    console.log(`Removing build directory <${dist}>`);

    await fs.rm(dist, { force: true, recursive: true });
}

main().catch(e => console.error("Unexpected error", e));