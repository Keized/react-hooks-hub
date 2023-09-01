import { useRef, useEffect } from 'react';

/**
 * Custom hook to debounce a function.
 * @param callback The function to debounce.
 * @param delay The delay time in milliseconds.
 * @returns A debounced version of the provided function.
 */
export function useDebounce<T extends any[]>(callback: (...args: T) => void, delay: number) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const callbackRef = useRef<Function>(callback);
    const isMountedRef = useRef<boolean>(true);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback])

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
            timeoutRef.current && clearTimeout(timeoutRef.current);
        }
    }, [])

    const debounced = (...args: T) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
                callbackRef.current(...args)
            }
        }, delay);
    }

    return debounced;
}