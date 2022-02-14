import React from 'react';
import { OpenInAppBanner } from '../src/components';
import { action } from '@storybook/addon-actions';
import { useOpenInAppBanner } from '../src';

const HookTester = ({ config }: { config: any }) => {
  const { hideBanner, showBanner, storeLink } = useOpenInAppBanner(config);
  return (
    <div
      style={{
        height: '90vh',
        position: 'relative',
        backgroundColor: '#eee'
      }}
    >
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
            backgroundColor: '#fff'
          }}
        >
          <button
            className="open-in-app-banner-close-button"
            data-testid="open-in-app-banner-close-button"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              flexGrow: 1
            }}
          >
            <span
              data-testid="open-in-app-banner-app-name"
              style={{ fontWeight: 600, fontSize: '1em' }}
            >
              My Example App
            </span>
            <span
              data-testid="open-in-app-banner-description"
              style={{ fontSize: '0.85em' }}
            >
              Get it now!
            </span>
          </div>
          <button
            className="open-in-app-banner-open-button"
            data-testid="open-in-app-banner-open-button"
            type="button"
            onClick={action('open')}
            aria-label="Open in App"
            style={{
              border: '2px solid #1ea7fd',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0.5em',
              borderRadius: '0.5em',
              color: '#1ea7fd',
              fontWeight: 600,
              fontSize: '1em'
            }}
          >
            Open ME!
          </button>
        </div>
      )}
      <div
        style={{
          padding: '10px',
          position: 'absolute',
          bottom: 0,
          fontSize: '12px'
        }}
      >
        <div>User agent: {navigator.userAgent}</div>
        <div>showBanner: {showBanner}</div>
        <div>storeLink: {storeLink}</div>
      </div>
    </div>
  );
};

export default {
  title: 'useOpenInAppBanner',
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
    <HookTester
      config={{
        showOnWeb: true,
        playStoreAppId: '1234',
        appStoreAppId: '1234',
        appStoreAppName: '1234'
      }}
    />
  );
};
