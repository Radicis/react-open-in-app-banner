import React, { ReactElement, useEffect, useState } from 'react';
import {
  appStoreBaseHref as defaultAppStoreBaseHref,
  playStoreBaseHref as defaultPlayStoreBaseHref,
  userAgentStrings
} from '../../config';

const webviewRegExp = new RegExp('(' + userAgentStrings.join('|') + ')', 'ig');

type Props = {
  /** We want to be able to show this on desktop for testing purposes (it won't populate the store link though  */
  showOnWeb?: boolean;
  /** Optional Hex color to use as the button color */
  buttonColor?: string;
  /** Optional open store handler to override the window.location default */
  onOpenStoreLink?: (storeLink: string) => void;
  /** Optional Text to display on the "open" button */
  openButtonLabel?: string;
  /** Text to display as your app name on the top of the banner */
  appName: string;
  /** Text to display under the app name to describe the purpose of the banner */
  bannerDescription: string;
  /** Optional Icon for your app (you will need to constrain its dimensions in the parent component) */
  appIcon?: ReactElement;
  // Play Store Details
  /** Optional override for the Google Play Store links generated */
  playStoreBaseHref?: string;
  /** The app ID of your app in the Google Play Store */
  playStoreAppId: string;

  // Apple App Store Details
  /** Optional override for the Apple app store links generated */
  appStoreBaseHref?: string;
  /** The app ID of your app in the Apple App Store */
  appStoreAppId: string;
  /** The app name of your app in the Apple App Store */
  appStoreAppName: string;
  /** Base font size to use - defaults to 1rem if not provided */
  fontSize?: string;
  /** Optional inline style */
  style?: Object;
};

const OpenInAppBanner = ({
  showOnWeb,
  buttonColor = '#1ea7fd',
  onOpenStoreLink,
  appIcon,
  openButtonLabel = 'OPEN',
  appStoreBaseHref,
  playStoreBaseHref,
  appName,
  bannerDescription,
  playStoreAppId,
  appStoreAppId,
  appStoreAppName,
  fontSize = '1rem',
  style = {}
}: Props) => {
  const autoHideBanner = localStorage.getItem('hideOpenInAppBanner');
  const [showBanner, setShowBanner] = useState<boolean>(!!autoHideBanner);
  const [storeLink, setStoreLink] = useState<string>('');

  /**
   * Check if the user-agent is Android
   * @returns {RegExpMatchArray} true/false
   */
  const isAndroid = () => {
    return navigator.userAgent.match('Android');
  };

  /**
   * Check if the user-agent is iPad/iPhone/iPod
   * @returns {RegExpMatchArray} true/false
   */
  const isIOS = () => {
    return (
      navigator.userAgent.match('iPad') ||
      navigator.userAgent.match('iPhone') ||
      navigator.userAgent.match('iPod')
    );
  };

  /**
   * Sets hideOpenInAppBanner in localStorage and calls the optional onHideBanner handler
   */
  const hideBanner = () => {
    localStorage.setItem('hideOpenInAppBanner', 'yes');
    setShowBanner(false);
  };

  /**
   * Navigates to the relevant store page
   */
  const openStoreLink = () => {
    onOpenStoreLink
      ? onOpenStoreLink(storeLink)
      : (window.location.href = storeLink);
  };

  /**
   * Initialises the banner by checking the user agent.
   * Sets the store link accordingly and sets showBanner boolean
   */
  const initBanner = () => {
    if (isIOS()) {
      setStoreLink(
        `${
          appStoreBaseHref || defaultAppStoreBaseHref
        }/${appStoreAppName}/id${appStoreAppId}?mt-8`
      );
      setShowBanner(true);
    } else if (isAndroid()) {
      setStoreLink(
        `${
          playStoreBaseHref || defaultPlayStoreBaseHref
        }/details?id=${playStoreAppId}`
      );
      setShowBanner(true);
    } else if (showOnWeb) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  };

  useEffect(() => {
    if (autoHideBanner || !!navigator.userAgent.match(webviewRegExp)) {
      setShowBanner(false);
    } else {
      initBanner();
    }
  }, [autoHideBanner, navigator.userAgent]);

  return (
    <>
      {showBanner && (
        <div
          style={{
            boxSizing: 'border-box',
            position: 'fixed',
            width: '100%',
            padding: '0.75rem',
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            ...style,
            fontSize
          }}
        >
          <button
            className="open-in-app-banner-close-button"
            onClick={hideBanner}
            type="button"
            aria-label="Close Banner"
            style={{
              border: 0,
              padding: '0.25em 0',
              background: 'transparent',
              cursor: 'pointer'
            }}
          >
            {/* Hero icons 'x' ->  https://heroicons.com/ */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                width: '1.25em',
                height: '1.25em'
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {appIcon}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              flexGrow: 1
            }}
          >
            <span style={{ fontWeight: 600, fontSize: '1em' }}>{appName}</span>
            <span style={{ fontSize: '0.85em' }}>{bannerDescription}</span>
          </div>
          <button
            className="open-in-app-banner-open-button"
            type="button"
            onClick={openStoreLink}
            aria-label="Open in App"
            style={{
              border: `2px solid ${buttonColor}`,
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5em',
              borderRadius: '0.5em',
              color: buttonColor,
              fontWeight: 600,
              fontSize: '1em'
            }}
          >
            {openButtonLabel}
          </button>
        </div>
      )}
    </>
  );
};

export default OpenInAppBanner;
