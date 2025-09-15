import { RefObject, useCallback, useEffect } from 'react';

export function useClickOutside(refs: Array<RefObject<HTMLElement | null>>, callback: (_: boolean) => void  = () => {}): void {
    const handleClickOutside = useCallback((event: MouseEvent) => {
        const clickedOutside = refs.every(ref => {
            return ref.current && !ref.current.contains(event.target as Node);
        });

        callback(clickedOutside);
    }, [refs, callback]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [handleClickOutside]);
}