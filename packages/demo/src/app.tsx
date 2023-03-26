import "@melloware/coloris-react/coloris.css";

import {
    type ColorisValue,
    createColoris
} from "@melloware/coloris-react";
import { useCallback, useState } from "react";

const Coloris = createColoris({
    a11y: {
        alphaSlider: "Opacity slider",
        clear: "Clear the selected color",
        close: "Close color picker",
        format: "Color format",
        hueSlider: "Farbton-Slider",
        input: "Color swatch",
        instruction: "Saturation and brightness selector. Use up, down, left and right arrow keys to select.",
        marker: "Saturation: {s}. Brightness: {v}.",
        open: "Farbwähler öffnen",
        swatch: "Color swatch",
    },
});

function onOpen() {
    console.log("open");
}

function onClose() {
    console.log("close");
}

export function App(): JSX.Element {
    const [value, setValue] = useState<string>();
    const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
    const [value2] = useState<string>();
    const [value3] = useState<string>();

    const onInput = useCallback((v: ColorisValue) => setValue(v), []);

    return (
        <div>
            <h1>Coloris React demo</h1>

            <h2>Hex</h2>
            <strong>Value: {value}</strong>
            <br />
            <Coloris value={value} onInput={onInput} format="hex" themeMode={themeMode} onOpen={onOpen} onClose={onClose}></Coloris>

            <button onClick={() => setValue("#ff0000")}>Set to red</button>
            <button onClick={() => setValue("#00ff00")}>Set to green</button>
            <button onClick={() => setValue("#0000ff")}>Set to blue</button>
            <button onClick={() => setValue(undefined)}>Clear</button>
            <button onClick={() => setThemeMode("light")}>Light mode</button>
            <button onClick={() => setThemeMode("dark")}>Dark mode</button>

            <h2>RGB</h2>
            <strong>Value: {value2}</strong>
            <br />
            <Coloris value={value2} format="rgb"></Coloris>

            <h2>HSL</h2>
            <strong>Value: {value3}</strong>
            <br />
            <Coloris value={value3} format="hsl"></Coloris>
        </div>
    );
}