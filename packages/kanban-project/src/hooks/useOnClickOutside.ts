import { MutableRefObject, useEffect } from "react";

export function useOnClickOutside(ref: MutableRefObject<HTMLElement | null>, handler: (ev: MouseEvent) => any) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
}
