import { createColoris } from "../src/index.js";

const Coloris = createColoris();

export function App(){
    return <div>
        <Coloris theme="pill"></Coloris>
    </div>;
}