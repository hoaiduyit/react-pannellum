export interface PannellumViewer {
  on(event: string, handler: (...args: unknown[]) => void): void;
  off(event: string, handler: (...args: unknown[]) => void): void;
  isLoaded(): boolean;
  getPitch(): number;
  setPitch(
    pitch: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ): void;
  getPitchBounds(): unknown;
  setPitchBounds(bounds: unknown): void;
  getYaw(): number;
  setYaw(
    yaw: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ): void;
  getYawBounds(): unknown;
  setYawBounds(bounds: unknown): void;
  getHfov(): number;
  setHfov(
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ): void;
  getHfovBounds(): unknown;
  setHfovBounds(bounds: unknown): void;
  lookAt(
    pitch: number,
    yaw: number,
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ): void;
  getNorthOffset(): number;
  setNorthOffset(heading: number): void;
  getHorizonRoll(): number;
  setHorizonRoll(roll: number): void;
  getHorizonPitch(): number;
  setHorizonPitch(pitch: number): void;
  startAutoRotate(speed?: number, pitch?: number): void;
  stopAutoRotate(): void;
  mouseEventToCoords(event: unknown): unknown;
  addScene(sceneId: string, config: unknown): void;
  getScene(): string | undefined;
  getAllScenes(): unknown;
  removeScene(sceneId: string): void;
  loadScene(
    sceneId: string,
    targetPitch?: number | null,
    targetYaw?: number | null,
    targetHfov?: number | null,
    fadeDone?: () => void
  ): void;
  toggleFullscreen(): boolean;
  getConfig(): unknown;
  getContainer(): unknown;
  addHotSpot(hotspot: unknown, sceneId?: string): void;
  removeHotSpot(hotSpotId: string, sceneId?: string): void;
  destroy(): void;
  stopMovement(): void;
  resize(): void;
  isOrientationSupported(): boolean;
  stopOrientation(): void;
  startOrientation(): void;
  isOrientationActive(): boolean;
}
