import { cleanup, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from './index';

describe('useClickOutside', () => {
    afterEach(cleanup);

    it('should call callback with true when clicking outside', () => {
        const callback = jest.fn();
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const { result } = renderHook(() => {
            const ref = useRef<HTMLElement>(null);
            ref.current = document.createElement('div');
            document.body.appendChild(ref.current);
            useClickOutside([ref], callback);
            return ref;
        });

        outsideElement.click();

        expect(callback).toHaveBeenCalledWith(true);

        document.body.removeChild(outsideElement);
        if (result.current.current) {
            document.body.removeChild(result.current.current);
        }
    });

    it('should call callback with false when clicking inside', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => {
            const ref = useRef<HTMLElement>(null);
            ref.current = document.createElement('div');
            document.body.appendChild(ref.current);
            useClickOutside([ref], callback);
            return ref;
        });

        const insideElement = document.createElement('div');
        if (result.current.current) {
            result.current.current.appendChild(insideElement);
            insideElement.click();
        }

        expect(callback).toHaveBeenCalledWith(false);

        if (result.current.current) {
            document.body.removeChild(result.current.current);
        }
    });

    it('should work with multiple refs', () => {
        const callback = jest.fn();
        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        const { result } = renderHook(() => {
            const ref1 = useRef<HTMLElement>(null);
            const ref2 = useRef<HTMLElement>(null);
            ref1.current = document.createElement('div');
            ref2.current = document.createElement('div');
            document.body.appendChild(ref1.current);
            document.body.appendChild(ref2.current);
            useClickOutside([ref1, ref2], callback);
            return { ref1, ref2 };
        });

        outsideElement.click();

        expect(callback).toHaveBeenCalledWith(true);

        document.body.removeChild(outsideElement);
        if (result.current.ref1.current) {
            document.body.removeChild(result.current.ref1.current);
        }
        if (result.current.ref2.current) {
            document.body.removeChild(result.current.ref2.current);
        }
    });

    it('should clean up event listener on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
        const callback = jest.fn();

        const { unmount } = renderHook(() => {
            const ref = useRef<HTMLElement>(null);
            useClickOutside([ref], callback);
            return ref;
        });

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));

        removeEventListenerSpy.mockRestore();
    });
});