import { useLayoutEffect, useMemo, useRef, useState } from "react";

type Theme = 'light' | 'dark';

type Mode = Theme | 'system';

type Config = {
    persistance?: boolean;    
    storageKey?: string;
    defaultMode?: Mode
};

const defaultConfig = { 
    persistance: false,
    storageKey: 'use-dark-mode', 
    defaultMode: 'system'
}

export function useDarkMode(userConfig?: Config): { switchMode: (mode: Mode) => void,  darkMode: boolean } {
    const isBrowser = typeof window !== 'undefined';
    const schemeMedia = useRef<MediaQueryList | null>(isBrowser ? window.matchMedia('(prefers-color-scheme: dark)') : null);

    const {persistance, storageKey, defaultMode} = { ...defaultConfig, ...userConfig }

    const getInitialMode = useMemo((): boolean => {
        if (!isBrowser) return defaultMode === 'dark';

        if (persistance) {
            const persistedValue = localStorage.getItem(storageKey);
            if (persistedValue === 'dark' || persistedValue === 'light') {
                return persistedValue === 'dark';
            } 
        }

        if (defaultMode === 'system') return schemeMedia.current?.matches || false;

        return defaultMode === 'dark';
    }, [])
    
    const [darkMode, setDarkMode] = useState(getInitialMode);

    const switchMode = (mode: Mode) => {
        if (!isBrowser) return;

        if (mode === 'system') {
            setDarkMode(schemeMedia.current?.matches ?? false);
            localStorage.removeItem(storageKey);
        } else {
            setDarkMode(mode === 'dark');
            if (persistance) {
              localStorage.setItem(storageKey, mode);
            }
        }
    }

    useLayoutEffect(() => {
        if (!isBrowser || !schemeMedia.current) return;

        const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
        schemeMedia.current.addEventListener('change', handler);
        return () => {
            schemeMedia.current?.removeEventListener('change', handler);
        }
    }, [isBrowser]);

    return { switchMode, darkMode };
}