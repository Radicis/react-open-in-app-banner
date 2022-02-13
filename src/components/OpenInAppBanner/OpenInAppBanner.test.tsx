import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import OpenInAppBanner from './OpenInAppBanner';

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

describe('OpenInAppBanner', () => {
  beforeEach(() => {
    mockUserAgent = 'test';
    window.location.href = 'test';
    mockSetItem.mockReset();
    mockGetItem.mockReset();
  });
  test('should render the component without error', () => {
    render(
      <OpenInAppBanner
        showOnWeb
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
  });
  test('should not render component without correct agent or showOnWeb', () => {
    const { queryByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
    expect(queryByTestId('open-in-app-banner-close-button')).toBeFalsy();
  });
  test('should render component with expected defaults rendered', () => {
    const { getByTestId } = render(
      <OpenInAppBanner
        showOnWeb
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
    expect(getByTestId('open-in-app-banner-close-button')).toBeTruthy();
    const appName = getByTestId('open-in-app-banner-app-name');
    expect(appName.innerHTML).toContain('Example App');
    const description = getByTestId('open-in-app-banner-description');
    expect(description.innerHTML).toContain('Hey you! Get our app!');
    expect(getByTestId('open-in-app-banner-open-button')).toBeTruthy();
  });
  test('should close the banner', () => {
    const { getByTestId } = render(
      <OpenInAppBanner
        showOnWeb
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
    const closeButton = getByTestId('open-in-app-banner-close-button');
    expect(closeButton).toBeTruthy();
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(mockSetItem).toHaveBeenCalledTimes(1);
    expect(mockSetItem).toHaveBeenCalledWith('hideOpenInAppBanner', 'yes');
  });
  test('should open the store link on web', () => {
    const { getByTestId } = render(
      <OpenInAppBanner
        showOnWeb
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
    expect(window.location.href).toEqual('test');
    const openButton = getByTestId('open-in-app-banner-open-button');
    expect(openButton).toBeTruthy();
    act(() => {
      fireEvent.click(openButton);
    });
    expect(window.location.href).toEqual(''); // it will be blank on web if it works
  });
  test('should open the store link on Android', () => {
    mockUserAgent = 'somethingAndroid';
    const { getByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
    expect(window.location.href).toEqual('test');
    const openButton = getByTestId('open-in-app-banner-open-button');
    expect(openButton).toBeTruthy();
    act(() => {
      fireEvent.click(openButton);
    });
    expect(window.location.href).toEqual(
      'https://play.google.com/store/apps/details?id=1234'
    );
  });
  test('should open a custom store link on Android', () => {
    mockUserAgent = 'somethingAndroidTest';
    const { getByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        playStoreBaseHref="test"
      />
    );
    expect(window.location.href).toEqual('test');
    const openButton = getByTestId('open-in-app-banner-open-button');
    expect(openButton).toBeTruthy();
    act(() => {
      fireEvent.click(openButton);
    });
    expect(window.location.href).toEqual('test/details?id=1234');
  });
  test('should open the store link on iOS', () => {
    mockUserAgent = 'somethingiPadsandSafari'; // we need safari here since without it, it will assume webview
    const { getByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
      />
    );
    expect(window.location.href).toEqual('test');
    const openButton = getByTestId('open-in-app-banner-open-button');
    expect(openButton).toBeTruthy();
    act(() => {
      fireEvent.click(openButton);
    });
    expect(window.location.href).toEqual(
      'http://itunes.apple.com/app/1234/id1234?mt-8'
    );
  });
  test('should open a custom store link on iOS', () => {
    mockUserAgent = 'somethingiPhoneestSafari';
    const { getByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        appStoreBaseHref="test"
      />
    );
    expect(window.location.href).toEqual('test');
    const openButton = getByTestId('open-in-app-banner-open-button');
    expect(openButton).toBeTruthy();
    act(() => {
      fireEvent.click(openButton);
    });
    expect(window.location.href).toEqual('test/1234/id1234?mt-8');
  });
  test('should NOT show the banner on Webview iOS', () => {
    mockUserAgent = 'somethingiPhoneest';
    const { queryByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        appStoreBaseHref="test"
      />
    );
    expect(window.location.href).toEqual('test');
    expect(queryByTestId('open-in-app-banner-open-button')).toBeFalsy();
  });
  test('should NOT show the banner on Webview Android', () => {
    mockUserAgent = 'fooAndroidwvfoo'; // not the wv
    const { queryByTestId } = render(
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        appStoreBaseHref="test"
      />
    );
    expect(window.location.href).toEqual('test');
    expect(queryByTestId('open-in-app-banner-open-button')).toBeFalsy();
  });
  test('should open the store link and call a custom handler', () => {
    const mockOpen = jest.fn();
    const { getByTestId } = render(
      <OpenInAppBanner
        showOnWeb
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        onOpenStoreLink={mockOpen}
      />
    );
    const openButton = getByTestId('open-in-app-banner-open-button');
    expect(openButton).toBeTruthy();
    act(() => {
      fireEvent.click(openButton);
    });
    expect(window.location.href).toEqual('test'); // it won't have changed here
    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith('');
  });
});
