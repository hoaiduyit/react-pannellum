# react-pannellum

> A library show panorama image for react

> This library use source from [https://pannellum.org/](https://pannellum.org/)

[![NPM](https://img.shields.io/npm/v/react-pannellum.svg)](https://www.npmjs.com/package/react-pannellum) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pannellum
```

## Usage

1. [Config props](#config)
2. [API Events](#apiEvents)
3. [API Event Listeners](#apiEventListeners)

```jsx
import React from "react";
import ReactPannellum, { getConfig } from "react-pannellum";

class Example extends React.Component {
  click() {
    console.log(getConfig());
  }

  render() {
    const config = {
      autoRotate: -2,
    };
    return (
      <div>
        <ReactPannellum
          id="1"
          sceneId="firstScene"
          imageSource="https://pannellum.org/images/alma.jpg"
          config={config}
        />
        <div onClick={this.click}>Click me</div>
      </div>
    );
  }
}
```

## <a id="config" ></a> Config props

### sceneId (required): string

An unique ID for the first scene.

### imageSource (required): string

Path of image you want to display

### id (required): string

Unique id for component

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

> Warning: `style` and `className` are not element of `config` prop.

### config (optional): object

Included all default configs below. i.e:

```js
config = {
  autoLoad: true,
};
```

### autoLoad (optional): boolean

When set to `true`, the panorama will automatically load. When `false`, the user needs to click on the load button to load the panorama. Defaults to `false`.

### autoRotate (optional): number

Make the panorama auto rotate, set a specific `number` will enable rotate. Default to `0`.

### autoRotateInactivityDelay (optional): number

Sets the delay, in milliseconds, to start automatically rotating the panorama after user activity ceases. This parameter only has an effect if the `autoRotateSpeep` parameter is set. Defautl to 0.

### autoRotateStopDelay (optional): number

Sets the delay, in milliseconds, to stop automatically rotating the panorama after it is loaded. This parameter only has an effect if the `autoRotateSpeep` parameter is set. Default to 0.

### preview (optional): string

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

### showZoomCtrl (optional): boolean

If set to `false`, the zoom controls will not be displayed. Defaults to `true`.

### keyboardZoom (optional): boolean

If set to `false`, zooming with keyboard will be disabled. Defaults to `true`.

### mouseZoom (optional): boolean

If set to `false`, zooming with mouse wheel will be disabled. Defaults to `true`. Can also be set to `fullscreenonly`, in which case it is only enabled when the viewer is fullscreen.

### doubleClickZoom (optional): boolean or string

If set to `true`, zooming with double click will be enabled. Defaults to `false`.

### draggable (optional): boolean

If set to `false`, mouse and touch dragging is disabled. Defaults to `true`.

### disableKeyboardCtrl (optional): boolean

If set to `true`, keyboard controls are disabled. Defaults to `false`.

### showFullscreenCtrl (optional): boolean

If set to `false`, the fullscreen control will not be displayed. Defaults to `true`. The fullscreen button will only be displayed if the browser supports the fullscreen API.

### showControls (optional): boolean

If set to `false`, no controls are displayed. Defaults to `true`.

### yaw (optional): number

Sets the panorama’s starting yaw position in degrees. Defaults to `0`.

### pitch (optional): number

Sets the panorama’s starting pitch position in degrees. Defaults to `0`.

### `minYaw` and `maxYaw` (optional): number

Sets the minimum / maximum yaw the viewer edge can be at, in degrees. Defaults to -180 / 180, i.e. no limit.

### `minPitch` and `maxPitch` (optional): number

Sets the minimum / maximum pitch the viewer edge can be at, in degrees. Defaults to -90 / 90.

### hfov (optional): number

Sets the panorama’s starting horizontal field of view in degrees. Defaults to `100`.

### compass (optional): boolean

If `true`, a compass is displayed. Normally defaults to `false`.

### northOffset (optional): number

Set the offset, in degrees, of the center of the panorama from North. As this affects the compass, it only has an effect if `compass` is set to `true`. Default to `0`

### hotSpots (optional): array

This specifies an array of hot spots that can be links to other scenes, information, or external links. Each array element has the following properties:

#### pitch (number)

Specifies the pitch portion of the hot spot’s location, in degrees.

#### yaw (number)

Specifies the yaw portion of the hot spot’s location, in degrees.

#### type (string)

Specifies the type of the hot spot. Can be scene for scene links or info for information hot spots. A tour configuration file is required for scene hot spots.

#### text (string)

This specifies the text that is displayed when the user hovers over the hot spot.

#### URL (string)

If specified for an info hot spot, the hot spot links to the specified URL. Not applicable for scene hot spots.

#### sceneId (string)

Specifies the ID of the scene to link to for scene hot spots. Not applicable for info hot spots.

#### targetPitch (number)

Specifies the pitch of the target scene, in degrees. Can also be set to same, which uses the current pitch of the current scene as the initial pitch of the target scene.

#### targetYaw (number)

Specifies the yaw of the target scene, in degrees. Can also be set to same or sameAzimuth. These settings use the current yaw of the current scene as the initial yaw of the target scene; same uses the current yaw directly, while sameAzimuth takes into account the northOffset values of both scenes to maintain the same direction with regard to north.

#### targetHfov (number)

Specifies the HFOV of the target scene, in degrees.

#### id

Specifies hot spot ID, for use with API’s removeHotSpot function.

#### cssClass (string)

If specified, string is used as the CSS class for the hot spot instead of the default CSS classes.

#### createTooltipFunc (function) and createTooltipArgs (object)

If createTooltipFunc is specified, this function is used to create the hot spot tooltip DOM instead of the default function. The contents of createTooltipArgs are passed to the function as arguments.

#### clickHandlerFunc (function) and clickHandlerArgs (object)

If clickHandlerFunc is specified, this function is added as an event handler for the hot spot’s click event. The event object and the contents of clickHandlerArgs are passed to the function as arguments.

### hotSpotDebug (optional): boolean

When `true`, the mouse pointer’s pitch and yaw are logged to the console when the mouse button is clicked. Defaults to `false`.

## <a id="apiEvents" ></a> API Events

### - Do not call API event in `componentDidMount` or API event will return undefined.

> ### isLoaded
>
> Checks whether or not a panorama is loaded.

Returns `true` if a panorama is loaded, else `false`.

> ### getPitch
>
> Returns the pitch of the center of the view. Returns `number` Pitch in degrees

> ### setPitch
>
> Sets the pitch of the center of the view.

Parameters:

- `picth` [number] Pitch in degrees
- `animated` [(number | boolean)] Animation duration in milliseconds or false for no animation (optional, default 1000).
- `callback` [function] Function to call when animation finishes.
- `callbackArgs` [object] Arguments to pass to callback function.

> ### getPitchBounds
>
> Returns the minimum and maximum allowed pitches (in degrees). Returns `Array<number>` [minimum pitch, maximum pitch].

> ### setPitchBounds
>
> Set the minimum and maximum allowed pitches (in degrees).

Parameters:

- `bounds` [Array`<number>`][minimum pitch, maximum pitch]
  > ### getYaw
  >
  > Returns the yaw of the center of the view. Returns `number` Yaw in degrees.

> ### setYaw
>
> Sets the yaw of the center of the view.

Parameters:

- `yaw` number Yaw in degrees [-180, 180].
- `animated` [(boolean | number)] Animation duration in milliseconds or false for no animation (optional, default 1000).
- `callback` [function] Function to call when animation finishes.
- `callbackArgs` [object] Arguments to pass to callback function.

> ### getYawBounds
>
> Returns the minimum and maximum allowed pitches (in degrees). Returns `Array<number>` [yaw pitch, maximum yaw].

> ### setYawBounds
>
> Set the minimum and maximum allowed yaws (in degrees [-180, 180]).

Parameters:

- `bounds` [Array<`number`>][minimum yaw, maximum yaw]

> ### getHfov
>
> Returns the horizontal field of view. Returns `number` Horizontal field of view in degrees.

> ### setHfov
>
> Sets the horizontal field of view.

Parameters:

- `hfov` number Horizontal in degrees.
- `animated` [(boolean | number)] Animation duration in milliseconds or false for no animation (optional, default 1000).
- `callback` [function] Function to call when animation finishes.
- `callbackArgs` [object] Arguments to pass to callback function.

> ### getHfovBounds
>
> Returns the minimum and maximum allowed horizontal fields of view (in degrees). Returns `Array<number>` [minimum hfov, maximum hfov].

> ### setHfovBounds
>
> Set the minimum and maximum allowed horizontal fields of view (in degrees).

Parameters:

- `bounds` (Array<`number`>) [minimum hfov, maximum hfov].

> ### lookAt
>
> Set a new view. Any parameters not specified remain the same.

Parameters:

- `pitch` [number] Target pitch.
- `yaw` [number] Target yaw.
- `hfov` [number] Target hfov.
- `animated` [(boolean | number)] Animation duration in milliseconds or false for no animation (optional, default 1000).
- `callback` [function] Function to call when animation finishes.
- `callbackArg`s [object] Arguments to pass to callback function.

> ### getNorthOffset
>
> Returns the panorama’s north offset. Returns `number` North offset in degrees.

> ### setNorthOffset
>
> Sets the panorama’s north offset.

Parameters

- `heading` [number] North offset in degrees

> ### getHorizonRoll
>
> Returns the panorama’s horizon roll. Returns `number` Horizon roll in degrees.

> ### setHorizonRoll
>
> Sets the panorama’s horizon roll.

Parameters:

- `roll` [number] Horizon roll in degrees [-90, 90].

> ### getHorizonPitch
>
> Returns the panorama’s horizon pitch. Returns `number` Horizon pitch in degrees.

> ### setHorizonPitch
>
> Sets the panorama’s horizon pitch.

Parameters:

- `pitch` [number] Horizon pitch in degrees [-90, 90].

> ### startAutoRotate
>
> Start auto rotation.

Parameters:

- `speed` [number] Auto rotation speed / direction. If not specified, previous value is used.

- `pitch` [number] Horizon pitch in degrees [-90, 90].

> ### stopAutoRotate
>
> Stop auto rotation.

> ### mouseEventToCoords
>
> Calculate panorama pitch and yaw from location of mouse event.

Parameters:

- `event` MouseEvent Document mouse down event.

Returns [Array<`number`>][pitch, yaw]

> ### addScene
>
> Add a new scene.

Parameters:

- `sceneId` [string] The ID of the new scene.
- `config` [string] The configuration of the new scene.
- `callback` [function] Function to call when add scene finishes.

> ### getCurrentScene
>
> Returns `object` with sceneId and current scene config.

> ### getAllScenes
>
> Returns `Array` of all scenes you have.

> ### removeScene
>
> Remove a scene.

Parameters:

- `sceneId` [string] The ID of the scene.
- `callback` [function] Function to call when remove scene finishes.

Returns `false` if the scene is the current scene or if the scene doesn’t exists, else `true`.

> ### loadScene
>
> Change scene being viewed.

Parameters:

- `sceneId` string Identifier of scene to switch to.
- `pitch` [number] Pitch to use with new scene.
- `yaw` [number] Yaw to use with new scene.
- `hfov` [number] HFOV to use with new scene.
- `fadeDone` [boolean] If `true`, fade setup is skipped.

> ### toggleFullscreen
>
> Toggle fullscreen.

> ### getConfig
>
> Get configuration of current scene. Returns `object` Configuration of current scene.

> ### getContainer
>
> Get viewer’s container element. Returns HTMLElement Container `div` element.

> ### addHotSpot
>
> Add a new hot spot.

Parameters:

- `hs` [object] The configuration for the hot spot.
- `sceneId` [string] Adds hot spot to specified scene if provided, else to current scene.

Throws any Throws an error if the scene ID is provided but invalid.

> ### removeHotSpot
>
> Remove a hot spot.

Parameters:

- `hotSpotId` string The ID of the hot spot.
- `sceneId` string The ID of the current scene.

Returns `true` if deletion is successful, else `false`.

> ### stopMovement
>
> Stops all movement.

> ### resize
>
> This method should be called if the viewer's container is resized.

> ### isOrientationSupported
>
> Check if device orientation control is supported.

Returns `true` if supported, else `false`.

> ### stopOrientation
>
> Stop using device orientation.

> ### startOrientation
>
> Start using device orientation (does nothing if not supported).

> ### isOrientationActive
>
> Check if device orientation control is currently activated.

Returns `true` if active, else `false`.

> ### destroy
>
> Destructor.

## <a id="apiEventListeners" ></a> Api Event Listeners

> ### onPanoramaLoaded
>
> Will be triggered when panorama is loaded

## License

MIT © [hoaiduyit](https://github.com/hoaiduyit)
