import { useEffect, useRef } from "react";

export default function useUpdateEffect(effect, dependencies = []) {
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            effect();
        } else {
            isMounted.current = true;
        }
    }, dependencies);
}