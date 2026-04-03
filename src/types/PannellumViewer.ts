/** [min, max] pitch, yaw, or horizontal FOV in degrees (see README / Pannellum docs). */
export type PannellumBounds = readonly [number, number];

/** Panorama coordinates from `mouseEventToCoords` — `[pitch, yaw]` in degrees. */
export type PannellumPitchYaw = readonly [number, number];

/** One entry per scene from `getAllScenes`: a single-key object `{ [sceneId]: sceneConfig }`. */
export type PannellumSceneListEntry = Record<string, Record<string, unknown>>;

/** Current scene configuration from `getConfig` (Pannellum scene/tour shape). */
export type PannellumSceneConfig = Record<string, unknown>;

export interface PannellumViewer {
  on(event: string, handler: (...args: unknown[]) => void): void;
  off(event: string, handler: (...args: unknown[]) => void): void;
  isLoaded(): boolean;
  getPitch(): number;
  setPitch(
    pitch: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>
  ): void;
  getPitchBounds(): PannellumBounds;
  setPitchBounds(bounds: PannellumBounds): void;
  getYaw(): number;
  setYaw(
    yaw: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>
  ): void;
  getYawBounds(): PannellumBounds;
  setYawBounds(bounds: PannellumBounds): void;
  getHfov(): number;
  setHfov(
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>
  ): void;
  getHfovBounds(): PannellumBounds;
  setHfovBounds(bounds: PannellumBounds): void;
  lookAt(
    pitch: number,
    yaw: number,
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: Record<string, unknown>
  ): void;
  getNorthOffset(): number;
  setNorthOffset(heading: number): void;
  getHorizonRoll(): number;
  setHorizonRoll(roll: number): void;
  getHorizonPitch(): number;
  setHorizonPitch(pitch: number): void;
  startAutoRotate(speed?: number, pitch?: number): void;
  stopAutoRotate(): void;
  mouseEventToCoords(event: MouseEvent): PannellumPitchYaw;
  addScene(sceneId: string, config: Record<string, unknown>): void;
  getScene(): string | undefined;
  getAllScenes(): PannellumSceneListEntry[];
  removeScene(sceneId: string): void;
  loadScene(
    sceneId: string,
    targetPitch?: number | null,
    targetYaw?: number | null,
    targetHfov?: number | null,
    fadeDone?: () => void
  ): void;
  toggleFullscreen(): boolean;
  getConfig(): PannellumSceneConfig;
  getContainer(): HTMLElement;
  addHotSpot(hotspot: Record<string, unknown>, sceneId?: string): void;
  removeHotSpot(hotSpotId: string, sceneId?: string): void;
  destroy(): void;
  stopMovement(): void;
  resize(): void;
  isOrientationSupported(): boolean;
  stopOrientation(): void;
  startOrientation(): void;
  isOrientationActive(): boolean;
}
