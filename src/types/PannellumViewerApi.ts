import type {
  PannellumBounds,
  PannellumPitchYaw,
  PannellumSceneConfig,
  PannellumSceneListEntry,
  PannellumViewer,
} from "@/types/PannellumViewer.js";

export type {
  PannellumBounds,
  PannellumPitchYaw,
  PannellumSceneConfig,
  PannellumSceneListEntry,
};

/** Imperative Pannellum methods exposed by `usePannellum()` for the nearest `<ReactPannellum>` instance. */
export interface PannellumViewerApi {
  /** Whether a panorama is loaded, evaluated when the hook builds this API object (not a live getter). */
  isLoaded: boolean;
  /** Center view pitch in degrees, or `undefined` if the viewer is not ready. */
  getPitch: () => number | undefined;
  /**
   * Sets center pitch in degrees.
   * @param pitch Target pitch in degrees.
   * @param animated Animation duration in milliseconds, or `0` / falsy for no animation (default 1000).
   * @param callback Invoked when the animation completes.
   * @param callbackArgs Value passed through to `callback`.
   */
  setPitch: (
    pitch: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>,
  ) => void;
  /** Minimum and maximum pitch in degrees `[min, max]`, or `undefined` if the viewer is not ready. */
  getPitchBounds: () => PannellumBounds | undefined;
  /**
   * Sets allowed pitch range in degrees.
   * @param bounds `[minimumPitch, maximumPitch]` in degrees.
   */
  setPitchBounds: (bounds: PannellumBounds) => void;
  /** Center view yaw in degrees, or `undefined` if the viewer is not ready. */
  getYaw: () => number | undefined;
  /**
   * Sets center yaw in degrees (`[-180, 180]`).
   * @param yaw Target yaw in degrees.
   * @param animated Animation duration in milliseconds, or `0` / falsy for no animation (default 1000).
   * @param callback Invoked when the animation completes.
   * @param callbackArgs Value passed through to `callback`.
   */
  setYaw: (
    yaw: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>,
  ) => void;
  /** Minimum and maximum yaw in degrees `[min, max]`, or `undefined` if the viewer is not ready. */
  getYawBounds: () => PannellumBounds | undefined;
  /**
   * Sets allowed yaw range in degrees `[-180, 180]`.
   * @param bounds `[minimumYaw, maximumYaw]` in degrees.
   */
  setYawBounds: (bounds: PannellumBounds) => void;
  /** Horizontal field of view in degrees, or `undefined` if the viewer is not ready. */
  getHfov: () => number | undefined;
  /**
   * Sets horizontal field of view in degrees.
   * @param hfov Target horizontal FOV in degrees.
   * @param animated Animation duration in milliseconds, or `0` / falsy for no animation (default 1000).
   * @param callback Invoked when the animation completes.
   * @param callbackArgs Value passed through to `callback`.
   */
  setHfov: (
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>,
  ) => void;
  /** Minimum and maximum horizontal FOV in degrees `[min, max]`, or `undefined` if the viewer is not ready. */
  getHfovBounds: () => PannellumBounds | undefined;
  /**
   * Sets allowed horizontal FOV range in degrees.
   * @param bounds `[minimumHfov, maximumHfov]` in degrees.
   */
  setHfovBounds: (bounds: PannellumBounds) => void;
  /**
   * Sets pitch, yaw, and hfov together; other view properties stay as-is when unchanged by Pannellum.
   * @param pitch Target pitch in degrees.
   * @param yaw Target yaw in degrees.
   * @param hfov Target horizontal FOV in degrees.
   * @param animated Animation duration in milliseconds, or `0` / falsy for no animation (default 1000).
   * @param callback Invoked when the animation completes.
   * @param callbackArgs Value passed through to `callback`.
   */
  lookAt: (
    pitch: number,
    yaw: number,
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>,
  ) => void;
  /** Panorama north offset in degrees, or `undefined` if the viewer is not ready. */
  getNorthOffset: () => number | undefined;
  /**
   * Sets the panorama north offset.
   * @param heading North offset in degrees.
   */
  setNorthOffset: (heading: number) => void;
  /** Horizon roll in degrees, or `undefined` if the viewer is not ready. */
  getHorizonRoll: () => number | undefined;
  /**
   * Sets horizon roll.
   * @param roll Roll in degrees (`[-90, 90]`).
   */
  setHorizonRoll: (roll: number) => void;
  /** Horizon pitch in degrees, or `undefined` if the viewer is not ready. */
  getHorizonPitch: () => number | undefined;
  /**
   * Sets horizon pitch used with auto-rotate / orientation.
   * @param pitch Pitch in degrees (`[-90, 90]`).
   */
  setHorizonPitch: (pitch: number) => void;
  /**
   * Starts auto-rotation around the view.
   * @param speed Rotation speed and direction; if omitted, Pannellum reuses the previous value.
   * @param pitch Horizon pitch in degrees (`[-90, 90]`) applied while rotating.
   */
  startAutoRotate: (speed?: number, pitch?: number) => void;
  /** Stops auto-rotation. */
  stopAutoRotate: () => void;
  /**
   * Maps a pointer event position to panorama coordinates.
   * @param event Typically a `mousedown` / `mousemove` style `MouseEvent` relative to the viewer canvas.
   * @returns `[pitch, yaw]` in degrees, or `undefined` if the viewer is not ready.
   */
  mouseEventToCoords: (event: MouseEvent) => PannellumPitchYaw | undefined;
  /**
   * Registers a new scene on a multi-scene (tour) viewer.
   * @param sceneId Unique id for the scene.
   * @param config Scene configuration (e.g. `image`, `hotSpots`, etc.) as Pannellum expects.
   * @param callback Optional hook invoked after the scene is added (library wrapper); may not run if validation fails.
   */
  addScene: (
    sceneId: string,
    config: Record<string, unknown>,
    callback?: () => void,
  ) => void;
  /** Current scene id (Pannellum `getScene`), or `undefined` if the viewer is not ready. */
  getCurrentScene: () => string | undefined;
  /** All scenes as `{ [sceneId]: config }` entries, or `undefined` if the viewer is not ready. */
  getAllScenes: () => PannellumSceneListEntry[] | undefined;
  /**
   * Removes a scene from the tour configuration.
   * @param sceneId Id of the scene to remove.
   * @param callback Optional hook run after removal when the wrapper calls into the viewer.
   */
  removeScene: (sceneId: string, callback?: () => void) => void;
  /**
   * Switches the panorama to another scene (tours).
   * @param sceneId Target scene id.
   * @param targetPitch Initial pitch for the new scene, or `null` to use the default.
   * @param targetYaw Initial yaw for the new scene, or `null` to use the default.
   * @param targetHfov Initial horizontal FOV for the new scene, or `null` to use the default.
   * @param fadeDone Optional callback after the scene transition (see Pannellum `loadScene` internals).
   */
  loadScene: (
    sceneId: string,
    targetPitch?: number | null,
    targetYaw?: number | null,
    targetHfov?: number | null,
    fadeDone?: () => void,
  ) => void;
  /** Tries to enter/exit fullscreen; result or `undefined` if the viewer is not ready. */
  toggleFullscreen: () => boolean | undefined;
  /** Mutable config object for the current scene, or `undefined` if the viewer is not ready. */
  getConfig: () => PannellumSceneConfig | undefined;
  /** Root container element for the viewer, or `undefined` if the viewer is not ready. */
  getContainer: () => HTMLElement | undefined;
  /**
   * Adds a hotspot to the current scene or to a specific scene in a tour.
   * @param hotspot Hotspot configuration (e.g. `pitch`, `yaw`, `type`, `text`, `id`, …).
   * @param sceneId When set, adds to that scene; otherwise uses the active scene.
   */
  addHotSpot: (hotspot: Record<string, unknown>, sceneId?: string) => void;
  /**
   * Removes a hotspot by its `id` field.
   * @param hotSpotId Hotspot id to remove.
   * @param sceneId When set, removes from that scene’s hotspot list; otherwise from the current scene.
   */
  removeHotSpot: (hotSpotId: string, sceneId?: string) => void;
  /** Tears down the viewer instance, or no-ops if missing. */
  destroy: () => void | undefined;
  /** Stops inertia / animated movement. */
  stopMovement: () => void;
  /** Call after the viewer’s container changes size. */
  resize: () => void;
  /** Whether device orientation is supported, evaluated when the hook builds this API object. */
  isOrientationSupported: boolean;
  /** Disables device orientation control. */
  stopOrientation: () => void;
  /** Enables device orientation control when supported. */
  startOrientation: () => void;
  /** Whether orientation control is active, evaluated when the hook builds this API object. */
  isOrientationActive: boolean;
  /** The underlying Pannellum viewer for this hook instance, or `null`. */
  getViewer: () => PannellumViewer | null;
  /** All viewers currently registered with the library (e.g. multiple instances). */
  getViewers: () => PannellumViewer[];
}
