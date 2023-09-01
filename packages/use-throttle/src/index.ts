import { useEffect, useRef } from 'react';

export function useThrottle<T extends any[]>( callback: (...args: T) => void, delay: number)
{
    const isThrottled =  useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            timeoutRef.current && clearTimeout(timeoutRef.current);
        }
    }, []);

    const throttled = (...args: T) => {
        if (!isThrottled.current) {
            isThrottled.current = true;
            callback(...args);

            timeoutRef.current = setTimeout(() => {
                isThrottled.current = false;
            }, delay);
        }
    };

    return throttled;
}