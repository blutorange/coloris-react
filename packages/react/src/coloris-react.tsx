import {
    type ColorisVirtualInstanceOptions,
    type ColorisOptions,
    coloris,
    setColor as setColorisColor,
    init as initColoris,
    setInstance as setColorisInstance,
    removeInstance as removeColorisInstance,
    close as closeColoris,
} from "@melloware/coloris";

import {
    useEffect,
    useId,
    useRef,
} from "react";

type GlobalPassthroughProps =
    | "a11y"
    | "inline"
    | "rtl";
// parent?

type LocalPassthroughProps =
    | "alpha"
    | "clearButton"
    | "clearLabel"
    | "closeButton"
    | "closeLabel"
    | "focusInput"
    | "forceAlpha"
    | "format"
    | "formatToggle"
    | "margin"
    | "selectInput"
    | "swatches"
    | "swatchesOnly"
    | "theme"
    | "themeMode";

export type Coloris = (props: ColorisProps) => JSX.Element;

/**
 * Value of the color picker. Either `undefined` when no color is selected, or
 * a string with a CSS color value.
 */
export type ColorisValue = string | undefined;

export interface ColorisSettings extends Pick<ColorisOptions, GlobalPassthroughProps> {
}

export interface ColorisProps extends Pick<ColorisVirtualInstanceOptions, LocalPassthroughProps> {
    /**
     * The color picker is closed and the selected color has changed
     * @param value  The newly selected value.
     */
    onChange?: (value: ColorisValue) => void;
    /**
     * The color picker is opened.
     */
    onOpen?: () => void;
    /**
     * A new color is selected. This event may occur even when the color picker
     * is still open.
     * @param value  The newly selected value.
     */
    onInput?: (value: ColorisValue) => void;
    /**
     * The color picker is closed.
     */
    onClose?: () => void;
    /**
     * The currently selected color.
     */
    value?: ColorisValue;
}

export function createColoris(settings?: ColorisSettings): Coloris {
    let initialized = false;

    return props => {
        const id = useId();
        const ref = useRef<HTMLInputElement>(null);

        // Ensure the global library is initialized
        useEffect(() => {
            if (!initialized) {
                console.log("initialize coloris");
                initialized = true;
                initColoris();
                coloris({
                    a11y: settings?.a11y,
                    el: ".coloris-react input",
                    inline: settings?.inline,
                    rtl: settings?.rtl,
                });
            }
        }, []);

        // Set the color picker settings
        useEffect(() => {
            console.log("change instance");
            const selector = `#${CSS.escape(id)}`;
            setColorisInstance(selector, {
                alpha: props.alpha,
                clearButton: props.clearButton,
                clearLabel: props.clearLabel,
                closeButton: props.closeButton,
                closeLabel: props.closeLabel,
                focusInput: props.focusInput,
                forceAlpha: props.forceAlpha,
                format: props.format,
                formatToggle: props.formatToggle,
                margin: props.margin,
                selectInput: props.selectInput,
                swatches: props.swatches,
                swatchesOnly: props.swatchesOnly,
                theme: props.theme,
                themeMode: props.themeMode,
            });
            return () => removeColorisInstance(selector);
        }, [
            id,
            props.alpha,
            props.clearButton,
            props.clearLabel,
            props.closeButton,
            props.closeLabel,
            props.focusInput,
            props.forceAlpha,
            props.format,
            props.formatToggle,
            props.margin,
            props.selectInput,
            props.swatches,
            props.swatchesOnly,
            props.theme,
            props.themeMode,
        ]);

        // Events
        useEffect(() => {
            console.log("event close");
            if (props.onClose !== undefined) {
                console.log("event close add listener");
                const close = () => props.onClose?.();
                ref.current?.addEventListener("close", close);
                return () => ref.current?.removeEventListener("close", close);
            }
            else {
                return undefined;
            }
        }, [props.onClose]);

        useEffect(() => {
            console.log("event open");
            if (props.onOpen !== undefined) {
                console.log("event open add listener");
                const open = () => props.onOpen?.();
                ref.current?.addEventListener("open", open);
                return () => ref.current?.removeEventListener("open", open);
            }
            else {
                return undefined;
            }
        }, [props.onOpen]);

        useEffect(() => {
            console.log("event input")
            if (props.onInput !== undefined) {
                console.log("event input add listener")
                const input = () => props.onInput?.(ref.current?.value);
                ref.current?.addEventListener("input", input);
                return () => ref.current?.removeEventListener("input", input);
            }
            else {
                return undefined;
            }
        }, [props.onInput]);

        useEffect(() => {
            console.log("event change")
            if (props.onChange !== undefined) {
                console.log("event change add listener")
                const change = () => props.onChange?.(ref.current?.value);
                ref.current?.addEventListener("change", change);
                return () => ref.current?.removeEventListener("change", change);
            }
            else {
                return undefined;
            }
        }, [props.onChange]);

        // Handle value changes
        useEffect(() => {
            if (ref.current !== null && ref.current.value !== props.value) {
                setColorisColor(props.value, ref.current);
            }
        }, [props.value]);

        // HTML
        return (
            <div className="coloris-react">
                <input id={id}
                    ref={ref}
                    type="text"
                    defaultValue={props.value}
                ></input>
            </div>
        );
    };
}
