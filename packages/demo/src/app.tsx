import "@melloware/coloris-react/coloris.css";

import {
    type ColorisValue,
    createColoris
} from "@melloware/coloris-react";
import { useCallback, useState } from "react";

const Coloris = createColoris();

function onOpen() {
    console.log("open");
}

function onClose() {
    console.log("close");
}

export function App(): JSX.Element {
    const [value1, setValue1] = useState<string>();
    const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
    const [value2] = useState<string>();
    const [value3] = useState<string>();

    const onChange1 = useCallback((v: ColorisValue) => setValue1(v), []);

    return (
        <div>
            <h1>Coloris React demo</h1>

            <h2>Hex</h2>
            <strong>Value: {value1}</strong>
            <br />
            <Coloris value={value1} onChange={onChange1} format="hex" themeMode={themeMode} onOpen={onOpen} onClose={onClose}></Coloris>

            <button onClick={() => setValue1("#ff0000")}>Set to red</button>
            <button onClick={() => setValue1("#00ff00")}>Set to green</button>
            <button onClick={() => setValue1("#0000ff")}>Set to blue</button>
            <button onClick={() => setValue1(undefined)}>Clear</button>
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