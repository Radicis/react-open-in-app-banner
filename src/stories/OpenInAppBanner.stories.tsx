import React, { ReactNode } from 'react';
import { OpenInAppBanner } from '../components';
import { action } from '@storybook/addon-actions';
import TransparentIconSrc from './transparent-icon.png';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        height: '90vh',
        position: 'relative',
        backgroundColor: '#eee'
      }}
    >
      {children}
    </div>
  );
};

export default {
  title: 'OpenInAppBanner',
  component: OpenInAppBanner,
  argTypes: {
    appName: {
      type: { name: 'string', required: true },
      defaultValue: 'Example App',
      description: 'The name of your app',
      control: {
        type: 'text'
      }
    },
    openButtonLabel: {
      type: { name: 'string', required: true },
      defaultValue: 'Open',
      description: 'What should the button say?',
      control: {
        type: 'text'
      }
    },
    bannerDescription: {
      type: { name: 'string', required: true },
      defaultValue: 'Hey, get our app!',
      description: 'Prompt your users to get your app',
      control: {
        type: 'text'
      }
    }
  }
};

export const Default = () => {
  // Clear localstorage
  localStorage.removeItem('hideOpenInAppBanner');

  return (
    <Wrapper>
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        onOpenStoreLink={action('open')}
      />
      <div
        style={{
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          fontSize: '12px'
        }}
      >
        User agent: {navigator.userAgent}
      </div>
    </Wrapper>
  );
};

export const WithIcon = () => {
  // Clear localstorage
  localStorage.removeItem('hideOpenInAppBanner');

  return (
    <Wrapper>
      <OpenInAppBanner
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        appIcon={
          <img
            style={{ width: '2.5rem', height: '2.5rem' }}
            src={TransparentIconSrc}
            alt="example"
          />
        }
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        onOpenStoreLink={action('open')}
      />
      <div
        style={{
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          fontSize: '12px'
        }}
      >
        User agent: {navigator.userAgent}
      </div>
    </Wrapper>
  );
};

export const BigAndBordered = () => {
  // Clear localstorage
  localStorage.removeItem('hideOpenInAppBanner');

  return (
    <Wrapper>
      <OpenInAppBanner
        openButtonLabel="OPEN APP"
        appName="Example App"
        bannerDescription="Hey you! Get our app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        appIcon={
          <img
            style={{ width: '5rem', height: '5rem' }}
            src={TransparentIconSrc}
            alt="example"
          />
        }
        fontSize="22px"
        style={{ borderBottom: '2px solid #ccc' }}
        onOpenStoreLink={action('open')}
      />
      <div
        style={{
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          fontSize: '12px'
        }}
      >
        User agent: {navigator.userAgent}
      </div>
    </Wrapper>
  );
};

export const LongContent = () => {
  // Clear localstorage
  localStorage.removeItem('hideOpenInAppBanner');

  return (
    <Wrapper>
      <OpenInAppBanner
        openButtonLabel="OPEN APP"
        appName="Example App by the Long Company"
        bannerDescription="Hey you! Get our app! No really... You NEED this app!"
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        onOpenStoreLink={action('open')}
      />
      <div
        style={{
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          fontSize: '12px'
        }}
      >
        User agent: {navigator.userAgent}
      </div>
    </Wrapper>
  );
};

export const Interactive = (args: {
  bannerDescription: any;
  appName: any;
  openButtonLabel: any;
  mainColor: any;
}) => {
  // Clear localstorage
  localStorage.removeItem('hideOpenInAppBanner');

  const { bannerDescription, appName, openButtonLabel, mainColor } = args;

  return (
    <Wrapper>
      <OpenInAppBanner
        appName={appName}
        bannerDescription={bannerDescription}
        openButtonLabel={openButtonLabel}
        playStoreAppId="1234"
        appStoreAppId="1234"
        appStoreAppName="1234"
        buttonColor={mainColor}
        onOpenStoreLink={action('open')}
      />
      <div
        style={{
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          fontSize: '12px'
        }}
      >
        User agent: {navigator.userAgent}
      </div>
    </Wrapper>
  );
};
