import {  cleanup, act, renderHook, waitFor } from '@testing-library/react';
import { useMediaQuery } from './index';

describe('useMediaQuery', () => {
    afterEach(cleanup);

    it('should return correct initial values', () => {
        window.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: query === '(orientation: landscape)',
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            }
        });

        const { result } = renderHook(() => useMediaQuery());
        
        expect(result.current.device).toBe('desktop');
        expect(result.current.orientation).toBe('landscape');
    });

    it('should detects device and orientation changes', async () => {
        window.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: query === '(orientation: landscape)',
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            }
        });

        const { result } = renderHook(() => useMediaQuery());

        act(() => {
            window.matchMedia = jest.fn().mockImplementation(query => ({
                    matches: query === '(orientation: portrait)',
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
            }));
            window.innerWidth = 800;
            window.dispatchEvent(new Event('orientationchange'));
            window.dispatchEvent(new Event('resize'));
        })

        await waitFor(() => {
            expect(result.current.orientation).toBe('portrait')
            expect(result.current.device).toBe('tablet')
        })
    });

    it('should detects device and orientation changes with custom devices', async () => {
        window.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: query === '(orientation: landscape)',
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            }
        });

        const { result } = renderHook(() => useMediaQuery({breakpoints: {mobile: 200, watch: 0, desktop: 992}}));

        act(() => {
            window.innerWidth = 100;
            window.dispatchEvent(new Event('resize'));
        });

        await waitFor(() => {
            expect(result.current.device).toBe('watch')
            expect(result.current.orientation).toBe('landscape')
        })
    });
});