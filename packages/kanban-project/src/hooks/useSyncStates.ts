import { useState } from "react";
import { useEffect } from "react";

export function useSyncStates<T>(value: T) {
    const [state, setState] = useState<T>(value);
    useEffect(() => {
        if (typeof value !== undefined && value !== state) {
            setState(value);
        }
    }, [value]);
    return [state, setState] as const;
}
