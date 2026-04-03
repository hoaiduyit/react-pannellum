/**
 * User-facing strings (merged into scene config). See Pannellum `uiText` option.
 */
export interface PannellumUiText {
  /** HTML/text shown on the load button before the panorama loads. */
  loadButtonLabel?: string;
  /** Shown while the panorama image is loading. */
  loadingLabel?: string;
  /** Author line format; `%s` is replaced with the author name. */
  bylineLabel?: string;
  /** Error when no panorama URL / source was given. */
  noPanoramaError?: string;
  /** Error when an image fails to load; `%s` may be replaced with details. */
  fileAccessError?: string;
  /** Error when the panorama URL is invalid. */
  malformedURLError?: string;
  /** iOS 8 WebGL / JPEG encoding limitation message. */
  iOS8WebGLError?: string;
  /** Shown when WebGL is unavailable or fails. */
  genericWebGLError?: string;
  /** Shown when the texture exceeds GPU limits; includes size placeholders. */
  textureSizeError?: string;
  /** Fallback message for unexpected errors. */
  unknownError?: string;
}

/** One hotspot on the panorama (Pannellum `hotSpots` item). */
export interface PannellumHotSpot {
  /** Hotspot altitude on the sphere, in degrees. */
  pitch: number;
  /** Hotspot horizontal angle, in degrees. */
  yaw: number;
  /** Hotspot kind, e.g. `"scene"` (link to another scene) or `"info"` (URL / text). */
  type: string;
  /** Label / tooltip text on hover. */
  text?: string;
  /** For `info` hotspots: opens this URL when clicked. */
  URL?: string;
  /** For `scene` hotspots: id of the scene to open. */
  sceneId?: string;
  /** Initial pitch when entering the target scene, or `"same"` to reuse current pitch. */
  targetPitch?: number | "same";
  /** Initial yaw when entering the target scene, `"same"`, or `"sameAzimuth"` (north-aware). */
  targetYaw?: number | "same" | "sameAzimuth";
  /** Initial horizontal FOV when entering the target scene, in degrees. */
  targetHfov?: number;
  /** Stable id for `removeHotSpot` and APIs. */
  id?: string;
  /** CSS class for the hotspot element instead of the default. */
  cssClass?: string;
  /** Custom tooltip factory; receives `createTooltipArgs`. */
  createTooltipFunc?: (...args: unknown[]) => unknown;
  /** Extra arguments passed to `createTooltipFunc`. */
  createTooltipArgs?: Record<string, unknown>;
  /** Click handler; receives the event and `clickHandlerArgs`. */
  clickHandlerFunc?: (...args: unknown[]) => unknown;
  /** Extra arguments passed to `clickHandlerFunc`. */
  clickHandlerArgs?: Record<string, unknown>;
}

/**
 * Options passed through `ReactPannellum`’s `config` prop (per-scene Pannellum settings).
 * Panorama type, `imageSource`, `cubeMap`, and `multiRes` are usually set via **component props**
 * and override these fields when merged at runtime.
 */
export interface ReactPannellumConfig {
  /** Title shown in the viewer chrome when set. */
  title?: string;
  /** Description shown when set. */
  description?: string;
  /** Author name; combined with `bylineLabel` in `uiText`. */
  author?: string;
  /** If `true`, loads immediately; if `false`, user must use the load button. */
  autoLoad?: boolean;
  /** Non-zero enables auto-rotation; sign/direction and speed are Pannellum-defined. */
  autoRotate?: number;
  /** Delay (ms) before auto-rotate resumes after user input; needs `autoRotate` set. */
  autoRotateInactivityDelay?: number;
  /** Delay (ms) after load before auto-rotate may stop; needs `autoRotate` set. */
  autoRotateStopDelay?: number;
  /** URL of a low-res preview image before full load. */
  preview?: string;
  /** Title on the load screen while preview is shown. */
  previewTitle?: string;
  /** Description on the load screen while preview is shown. */
  previewDescription?: string;
  /** Author line on the load screen while preview is shown. */
  previewAuthor?: string;
  /** Overrides/default UI strings (see `PannellumUiText`). */
  uiText?: Partial<PannellumUiText>;
  /** Show +/- zoom controls. */
  showZoomCtrl?: boolean;
  /** Allow keyboard +/- zoom when `true`. */
  keyboardZoom?: boolean;
  /** Mouse wheel zoom: `false` off, `true` on, `"fullscreenonly"` only in fullscreen. */
  mouseZoom?: boolean | "fullscreenonly";
  /** Enable double-click to zoom (boolean or Pannellum-specific string modes). */
  doubleClickZoom?: boolean | string;
  /** Allow drag/touch panning when `true`. */
  draggable?: boolean;
  /**
   * Drag inertia decay; higher stops motion faster. Range (0, 1], default ~0.15 in library defaults.
   */
  friction?: number;
  /** When `true`, arrow keys / keyboard look are disabled. */
  disableKeyboardCtrl?: boolean;
  /** Show fullscreen toggle when browser supports it. */
  showFullscreenCtrl?: boolean;
  /** When `false`, hides the default control bar. */
  showControls?: boolean;
  /** Multiplier for touch pan sensitivity. */
  touchPanSpeedCoeffFactor?: number;
  /** Starting yaw in degrees. */
  yaw?: number;
  /** Starting pitch in degrees. */
  pitch?: number;
  /** Minimum yaw the view can reach, in degrees. */
  minYaw?: number;
  /** Maximum yaw the view can reach, in degrees. */
  maxYaw?: number;
  /** Minimum pitch (look down limit), in degrees. */
  minPitch?: number;
  /** Maximum pitch (look up limit), in degrees. */
  maxPitch?: number;
  /** Minimum horizontal field of view (most “zoomed in”), in degrees. */
  minHfov?: number;
  /** Maximum horizontal field of view (“zoomed out”), in degrees. */
  maxHfov?: number;
  /** If `false`, multires may ignore `minHfov` and compute its own minimum. */
  multiResMinHfov?: boolean;
  /** Starting horizontal field of view, in degrees. */
  hfov?: number;
  /** Show compass overlay when `true`. */
  compass?: boolean;
  /** Degrees from image center to north; used with compass. */
  northOffset?: number;
  /** Escape HTML in config strings to reduce DOM XSS risk when using the API. */
  escapeHTML?: boolean;
  /** Interactive hotspots on this scene. */
  hotSpots?: PannellumHotSpot[];
  /** Log pitch/yaw on click for debugging hotspot placement. */
  hotSpotDebug?: boolean;
  /** Cross-fade duration (ms) between scenes on tours; WebGL-only in Pannellum. */
  sceneFadeDuration?: number;
  /** Which key codes Pannellum listens for (default: built-in navigation keys). */
  capturedKeyNumbers?: number[];
  /** RGB in 0–1 for areas without image (partial panos, missing tiles). */
  backgroundColor?: [number, number, number];
  /** Crop view to valid image; avoids showing `backgroundColor` outside the pano. */
  avoidShowingBackground?: boolean;
  /** Prefix for relative `imageSource` / cubemap / tile URLs in this scene. */
  basePath?: string;
  /** CORS mode for image requests, e.g. `"anonymous"` or `"use-credentials"`. */
  crossOrigin?: string;
  /** Enable dynamic / programmatic panorama sources (advanced Pannellum). */
  dynamic?: boolean;
  /** Continuously update from a dynamic source when `dynamic` is used. */
  dynamicUpdate?: boolean;
  /** Horizon pitch correction in degrees (e.g. from XMP / advanced setup). */
  horizonPitch?: number;
  /** Horizon roll in degrees. */
  horizonRoll?: number;
}
