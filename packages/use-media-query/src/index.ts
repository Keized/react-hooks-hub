import { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const defaultBreakpoints = { desktop: 992, tablet: 768, mobile: 0 };

type Breakpoints = {
    [breakpointName: string]: number;
};

type UseMediaQueryOptions<T extends Breakpoints> = {
    breakpoints?: T;
    debounceDelay?: number
}

type Orientation = 'portrait' | 'landscape';

type Device<T extends Breakpoints> = keyof T | undefined;

export function useMediaQuery<T extends Breakpoints = typeof defaultBreakpoints>({
    breakpoints = defaultBreakpoints as unknown as T,
    debounceDelay = 500
}: UseMediaQueryOptions<T> = {}) {

    const breakpointNames = Object.keys(breakpoints) as Array<keyof T>;
    
    const [device, setDevice] = useState<Device<T> | null>(null);
    const [orientation, setOrientation] = useState<Orientation | undefined>();

    const update = useCallback(() => {
        const width = window.innerWidth;
        let newDevice: keyof T | null = null;

        breakpointNames.forEach((breakpointName) => {
            if (width >= breakpoints[breakpointName] ) {
                if (!newDevice || breakpoints[breakpointName] > breakpoints[newDevice]) {
                    newDevice = breakpointName;                    
                } 
            }
        })

        setDevice(newDevice );

        if (window.matchMedia('(orientation: portrait)').matches) {
            setOrientation('portrait');
        } else {
            setOrientation('landscape');
        }
    }, [breakpointNames, breakpoints]);

    const debounced = useDebouncedCallback(update, debounceDelay);

    useLayoutEffect(() => {
        update();
        window.addEventListener('resize', debounced);
        window.addEventListener('orientationchange', debounced);
        return () => {
            window.removeEventListener('resize', debounced);
            window.removeEventListener('orientationchange', debounced);
        }
    }, [update, debounced]);

    return { device, orientation };
};
