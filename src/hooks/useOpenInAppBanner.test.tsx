import React from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useOpenInAppBanner from './useOpenInAppBanner';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

const localStorageMock = (() => {
  return {
    getItem: mockGetItem,
    setItem: mockSetItem
  };
})();

let mockUserAgent: string;

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'location', {
  value: {
    href: 'url'
  }
});

Object.defineProperty(global.navigator, 'userAgent', {
  get() {
    return mockUserAgent || 'test';
  }
});

describe('useOpenInAppBanner', () => {
  beforeEach(() => {
    mockUserAgent = 'test';
    window.location.href = 'test';
    mockSetItem.mockReset();
    mockGetItem.mockReset();
  });
  test('should render the hook without error', () => {
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234'
      })
    );
    expect(result.current.hideBanner).toBeTruthy();
    expect(result.current.showBanner).toBeTruthy();
    expect(result.current.storeLink).toEqual('');
  });
  test('should set showBanner to false when no matching UA or showOnWebFlag', () => {
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234'
      })
    );
    expect(result.current.hideBanner).toBeTruthy();
    expect(result.current.showBanner).toBeFalsy();
    expect(result.current.storeLink).toEqual('');
  });
  test('should close the banner', () => {
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234'
      })
    );
    expect(result.current.hideBanner).toBeTruthy();
    expect(result.current.showBanner).toBeTruthy();
    expect(result.current.storeLink).toEqual('');
    act(() => {
      result.current.hideBanner();
    });
    expect(result.current.showBanner).toBeFalsy();
  });
  test('should open the store link on Android', () => {
    mockUserAgent = 'somethingAndroid';
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234'
      })
    );
    expect(result.current.storeLink).toEqual(
      'https://play.google.com/store/apps/details?id=1234'
    );
  });
  test('should open a custom store link on Android', () => {
    mockUserAgent = 'somethingAndroidTest';
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234',
        playStoreBaseHref: 'test'
      })
    );
    expect(result.current.storeLink).toEqual('test/details?id=1234');
  });
  test('should open the store link on iOS', () => {
    mockUserAgent = 'somethingiPadsandSafari'; // we need safari here since without it, it will assume webview
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234'
      })
    );
    expect(result.current.storeLink).toEqual(
      'http://itunes.apple.com/app/1234/id1234?mt-8'
    );
  });
  test('should open a custom store link on iOS', () => {
    mockUserAgent = 'somethingiPhoneestSafari';
    const { result } = renderHook(() =>
      useOpenInAppBanner({
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234',
        appStoreBaseHref: 'test'
      })
    );
    expect(result.current.storeLink).toEqual('test/1234/id1234?mt-8');
  });
});
