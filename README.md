# react-open-in-app-banner

![Example1](https://raw.githubusercontent.com/Radicis/react-open-in-app-banner/main/media/example1.webp)
![Example2](https://raw.githubusercontent.com/Radicis/react-open-in-app-banner/main/media/example2.webp)

## Storybook Demo

https://radicis.github.io/react-open-in-app-banner

## Installation

```bash
npm install react-open-in-app-banner
# or
yarn add react-open-in-app-banner
```

## Usage

```JavaScript
<OpenInAppBanner
  appName="Example App"
  bannerDescription="Hey you! Get our app!"
  playStoreAppId="1234"
  appStoreAppId="1234"
  appStoreAppName="1234"
/>
```

## Customisation

```JavaScript
<OpenInAppBanner
  showOnWeb // Available for testing to show in desktop useragents
  appName="Example App"
  openButtonLabel="OPEN APP" // We can set a custom button label
  bannerDescription="Hey you! Get our app!"
  buttonColor='#1ea7fd' // Sets the color of the button and button text
  playStoreAppId="1234"
  appStoreAppId="1234"
  appStoreAppName="1234"
  appIcon={
    <img
      style={{ width: '2.5rem', height: '2.5rem' }}
      src={MyAppIconSrc}
      alt="example"
    />
  } // We can Provide an icon but be sure to constrain the dimensions
  fontSize="22px" // Sets the base font-size for the component
  style={{ borderBottom: '2px solid #ccc' }} // We can overide or add banner container styles here
  onOpenStoreLink={myCoolFunctio}
  appStoreBaseHref="something" // We can override the base Apple App store href
  playStoreBaseHref="something" // We can override the base Google Play store href
/>
```