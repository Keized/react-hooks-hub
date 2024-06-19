import { useLayoutEffect, useMemo, useRef, useState } from "react";

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
    const schemeMedia = useRef(window.matchMedia(`(prefers-color-scheme: dark)`));
    const {persistance, storageKey, defaultMode} = { ...defaultConfig, ...userConfig }

    const getInitialMode = useMemo((): boolean => {
        if (persistance) {
            const persistedValue = localStorage.getItem(storageKey);
            if (persistedValue && ['dark', 'light'].includes(persistedValue)) {
                return persistedValue === 'dark';
            } 
        }

        if (defaultMode === 'system') return schemeMedia.current.matches;

        return defaultMode === 'dark';
    }, [])
    
    const [darkMode, setDarkMode] = useState(getInitialMode);

    const switchMode = (mode: Mode) => {
        if (mode === 'system') {
            setSystemScheme();
            localStorage.removeItem(storageKey);
            return;
        }

        setDarkMode(prev => !prev);        
        if (persistance) {
            localStorage.setItem(storageKey, darkMode ? 'dark' : 'light');
        }
    }

    const setSystemScheme = () =>  {
        setDarkMode(schemeMedia.current.matches);
    }

    useLayoutEffect(() => {
        schemeMedia.current.addEventListener('change', setSystemScheme);
        return () => {
            schemeMedia.current?.removeEventListener('change', setSystemScheme);
        }
    }, []);

    return { switchMode, darkMode };
}