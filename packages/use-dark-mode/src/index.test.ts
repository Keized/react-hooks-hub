import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useDarkMode } from './index';

// Mock matchMedia
const matchMediaMock = (matches: boolean) => () => ({
  matches, // set system preference to dark
  media: '',
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

describe('useDarkMode', () => {
  let originalWindow: any;

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock(true),
    });
  });

  beforeEach(() => {
    originalWindow = global.window;
    localStorage.clear();
  });

  afterEach(() => {
    global.window = originalWindow;
  })

  it('should initialize with persisted mode if it is valid', () => {
    localStorage.setItem('use-dark-mode', 'dark');
    const { result } = renderHook(() => useDarkMode({ persistance: true }));
    expect(result.current.darkMode).toBe(true);
  });

  it('should initialize with default mode if persisted mode is invalid', () => {
    localStorage.setItem('use-dark-mode', 'invalid');
    const { result } = renderHook(() => useDarkMode({ persistance: true, defaultMode: 'light' }));
    expect(result.current.darkMode).toBe(false);
  });

  it('should switch to system mode and match system preference', () => {
    const { result } = renderHook(() => useDarkMode({ defaultMode: 'light' }));
    act(() => {
      result.current.switchMode('system');
    });
    expect(result.current.darkMode).toBe(true);
  });

  it('should toggle dark mode correctly', () => {
    const { result } = renderHook(() => useDarkMode({ defaultMode: 'light' }));
    act(() => {
      result.current.switchMode('dark');
    });
    expect(result.current.darkMode).toBe(true);
    act(() => {
      result.current.switchMode('light');
    });
    expect(result.current.darkMode).toBe(false);
  });

  it('should initialize dark mode correctly if the default mode is system and the system preference is dark', () => {
    const { result } = renderHook(() => useDarkMode({ defaultMode: 'system' }));
    expect(result.current.darkMode).toBe(true);
  });

  it('should persist dark mode in localStorage', () => {
    const { result } = renderHook(() => useDarkMode({ persistance: true, defaultMode: 'light' }));
    
    // Switch to dark mode and check if it is persisted
    act(() => {
      result.current.switchMode('dark');
    });
    expect(localStorage.getItem('use-dark-mode')).toBe('dark');
    
    // Switch to light mode and check if it is persisted
    act(() => {
      result.current.switchMode('light');
    });
    expect(localStorage.getItem('use-dark-mode')).toBe('light');
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.fn();
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: jest.fn(),
    }));
    const { unmount } = renderHook(() => useDarkMode({ defaultMode: 'light' }));
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
