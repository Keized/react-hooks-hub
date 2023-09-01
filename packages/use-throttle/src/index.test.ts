import { cleanup, act, renderHook } from '@testing-library/react';
import { useThrottle } from './index';

jest.useFakeTimers();

describe('useThrottle', () => {
    afterEach(cleanup);

    it('should throttle the callback and trigger it 2 times', () => {
        const callback = jest.fn();
        const delay = 200;

        const { result } = renderHook(() => useThrottle(callback, delay));

        act(() => {
            result.current();
            result.current();
            result.current();
            jest.advanceTimersByTime(800);
            result.current();
        });

        expect(callback).toHaveBeenCalledTimes(2);
    });
});
