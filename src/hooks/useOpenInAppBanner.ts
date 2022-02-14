import { useEffect, useState } from 'react';
import {
  appStoreBaseHref as defaultAppStoreBaseHref,
  playStoreBaseHref as defaultPlayStoreBaseHref,
  userAgentStrings
} from '../config';

const webviewRegExp = new RegExp('(' + userAgentStrings.join('|') + ')', 'ig');

type Props = {
  /** We want to be able to show this on desktop for testing purposes (it won't populate the store link though  */
  showOnWeb?: boolean;

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
};

const useOpenInAppBanner = ({
  showOnWeb,
  appStoreBaseHref,
  playStoreBaseHref,
  playStoreAppId,
  appStoreAppId,
  appStoreAppName
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

  return {
    showBanner,
    storeLink,
    hideBanner
  };
};

export default useOpenInAppBanner;
