import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.js";

const element = document.getElementById("app");
if (element === null) {
    throw new Error("App element not found");
}

const root = createRoot(element);
root.render(createElement(App));
