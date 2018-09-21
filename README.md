# react-pannellum

> A library show panorama image for react

> This library use source from [https://pannellum.org/](https://pannellum.org/)

[![NPM](https://img.shields.io/npm/v/react-pannellum.svg)](https://www.npmjs.com/package/react-pannellum) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pannellum
```

## Usage

```jsx
import React from 'react'
import Pannellum from 'react-pannellum'

class Example extends React.Component {
  render () {
    return (
      <Pannellum imageSource="https://pannellum.org/images/alma.jpg" autoRotate />
    )
  }
}
```

## Props

### imageSource (required): string
Path of image you want to display
### autoLoad (optional): boolean
When set to ``true``, the panorama will automatically load. When ``false``, the user needs to click on the load button to load the panorama. Defaults to ``false``.
### autoRotate (optional): boolean
Make the panorama auto rotate, set ``true`` will enable ``autoRotateSpeep`` with default speed is -2.
### autoRotateSpeep (optional): number
Rotate speed of the panorama. Trigger when ``autoRotate`` was called, if not, default to 0.
### autoRotateInactivityDelay (optional): number
Sets the delay, in milliseconds, to start automatically rotating the panorama after user activity ceases. This parameter only has an effect if the ``autoRotateSpeep`` parameter is set. Defautl to 0.
### autoRotateStopDelay (optional): number
Sets the delay, in milliseconds, to stop automatically rotating the panorama after it is loaded. This parameter only has an effect if the ```autoRotateSpeep``` parameter is set. Default to 0.
### previewImage (optional): string
Specifies a URL for a preview image to display before the panorama is loaded.
### uiText (optional): object
Allows user-facing strings to be changed / translated. Default setting: 
```js
  loadButtonLabel: "Click to<br>Load<br>Panorama",
  loadingLabel: "Loading...",
  bylineLabel: "by %s",
  noPanoramaError: "No panorama image was specified.",
  fileAccessError: "The file %s could not be accessed.",
  malformedURLError: "There is something wrong with the panorama URL.",
  iOS8WebGLError: "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
  genericWebGLError: "Your browser does not have the necessary WebGL support to display this panorama.",
  textureSizeError:  "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
  unknownError: "Unknown error. Check developer console."
```
### style (optional): object
Custom style of the panorama image. Default setting:
```js
{
  width: "600px",
  height: "400px",
  background: "#000000"
}
```
### className (optional): string
A string of classes to add to the main ReactPannellum element.

### And more props will available soon.

## License

MIT © [hoaiduyit](https://github.com/hoaiduyit)
