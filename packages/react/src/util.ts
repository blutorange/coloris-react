import { useEffect, useRef } from "react";

const triggered = new Set<string>();

export function useRunOnceWhenReadyStateComplete(type: string, fn: () => void): void {
    useEffect(() => {
        if (triggered.has(type)) {
            return;
        }
        if (document.readyState === "complete") {
            triggered.add(type);
            fn();
            return;
        }
        const callback = (event: Event) => {
            if (document.readyState === "complete") {
                if (!triggered.has(type)) {
                    triggered.add(type);
                    fn();
                }
            }
        };
        document.addEventListener("readystatechange", callback);
        return () => document.removeEventListener("readystatechange", callback);
    }, [type]);
}
