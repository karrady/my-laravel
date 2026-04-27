import { useEffect } from "react";

interface UseResizeObserverOptions {
    ref: React.RefObject<Element | null>;
    box?: ResizeObserverBoxOptions;
    onResize: () => void;
}

export function useResizeObserver({ ref, box, onResize }: UseResizeObserverOptions): void {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver(() => {
            onResize();
        });

        observer.observe(element, { box });
        return () => observer.disconnect();
    }, [ref, box, onResize]);
}
