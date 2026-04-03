import React, { useEffect } from "react";
import { createPannellumViewer } from "@/pannellumBridge.js";
import { withViewer } from "@/utils/utils.js";
import { configs } from "@/utils/constants.js";
import type { PannellumViewer } from "@/types/PannellumViewer.js";
import "../css/pannellum.css";

export type PanoramaType = "equirectangular" | "cubemap" | "multires";

export interface MultiResConfig {
  basePath?: string;
  path?: string;
  fallbackPath?: string;
  extension?: string;
  tileResolution?: number;
  maxLevel?: number;
  cubeResolution?: number;
}

export interface ReactPannellumProps {
  id: string;
  sceneId: string;
  children?: React.ReactNode;
  type?: PanoramaType;
  imageSource?: string;
  equirectangularOptions?: Record<string, unknown>;
  cubeMap?: string[];
  multiRes?: MultiResConfig;
  config?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
  onPanoramaLoaded?: () => void;
  onPanoramaMouseDown?: (event: unknown) => void;
  onPanoramaMouseUp?: (event: unknown) => void;
}

let myPannellum: PannellumViewer | null = null;
const myViewers: PannellumViewer[] = [];

type ReactPannellumComponent = React.FC<ReactPannellumProps> & {
  isLoaded: () => boolean | undefined;
  getPitch: () => number | undefined;
  setPitch: (
    pitch: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ) => void;
  getPitchBounds: () => unknown;
  setPitchBounds: (bounds: unknown) => void;
  getYaw: () => number | undefined;
  setYaw: (
    yaw: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ) => void;
  getYawBounds: () => unknown;
  setYawBounds: (bounds: unknown) => void;
  getHfov: () => number | undefined;
  setHfov: (
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ) => void;
  getHfovBounds: () => unknown;
  setHfovBounds: (bounds: unknown) => void;
  lookAt: (
    pitch: number,
    yaw: number,
    hfov: number,
    animated?: number,
    callback?: (...args: unknown[]) => void,
    callbackArgs?: unknown
  ) => void;
  getNorthOffset: () => number | undefined;
  setNorthOffset: (heading: number) => void;
  getHorizonRoll: () => number | undefined;
  setHorizonRoll: (roll: number) => void;
  getHorizonPitch: () => number | undefined;
  setHorizonPitch: (pitch: number) => void;
  startAutoRotate: (speed?: number, pitch?: number) => void;
  stopAutoRotate: () => void;
  mouseEventToCoords: (event: unknown) => unknown;
  addScene: (
    sceneId: string,
    config: Record<string, unknown>,
    callback?: () => void
  ) => void;
  getCurrentScene: () => string | undefined;
  getAllScenes: () => unknown;
  removeScene: (sceneId: string, callback?: () => void) => void;
  loadScene: (
    sceneId: string,
    targetPitch?: number | null,
    targetYaw?: number | null,
    targetHfov?: number | null,
    fadeDone?: () => void
  ) => void;
  toggleFullscreen: () => boolean | undefined;
  getConfig: () => unknown;
  getContainer: () => unknown;
  addHotSpot: (hotspot: Record<string, unknown>, sceneId?: string) => void;
  removeHotSpot: (hotSpotId: string, sceneId?: string) => void;
  destroy: () => void | undefined;
  stopMovement: () => void;
  resize: () => void;
  isOrientationSupported: () => boolean | undefined;
  stopOrientation: () => void;
  startOrientation: () => void;
  isOrientationActive: () => boolean | undefined;
  getViewer: () => PannellumViewer | null;
  getViewers: () => PannellumViewer[];
};

function ReactPannellumInner(props: ReactPannellumProps) {
  const {
    id,
    sceneId,
    config = {},
    type = "equirectangular",
    imageSource = "",
    equirectangularOptions = {},
    cubeMap = [],
    multiRes = {},
    className = "",
    style = configs.styles as React.CSSProperties,
    children,
    onPanoramaLoaded,
    onPanoramaMouseDown,
    onPanoramaMouseUp,
  } = props;

  useEffect(() => {
    const loadHandler = () => {
      onPanoramaLoaded?.();
    };
    const mouseDownHandler = (event: unknown) => {
      onPanoramaMouseDown?.(event);
    };
    const mouseUpHandler = (event: unknown) => {
      onPanoramaMouseUp?.(event);
    };

    const init = (state: {
      imageSource: string;
      equirectangularOptions: Record<string, unknown>;
      cubeMap: string[];
      multiRes: MultiResConfig;
    }) => {
      myPannellum = createPannellumViewer(id, {
        default: {
          firstScene: sceneId,
        },
        scenes: {
          [sceneId]: JSON.parse(
            JSON.stringify({
              ...configs.panoramaConfigs,
              ...configs.equirectangularOptions,
              ...configs.uiText,
              ...config,
              type,
              imageSource: state.imageSource,
              ...state.equirectangularOptions,
              cubeMap: state.cubeMap,
              multiRes: state.multiRes,
            })
          ),
        },
      });
      myViewers.push(myPannellum);
      if (onPanoramaLoaded) {
        myPannellum.on("load", loadHandler);
      }
      if (onPanoramaMouseDown) {
        myPannellum.on("mousedown", mouseDownHandler);
      }
      if (onPanoramaMouseUp) {
        myPannellum.on("mouseup", mouseUpHandler);
      }
    };

    switch (type) {
      case "equirectangular":
        init({
          imageSource,
          equirectangularOptions,
          cubeMap: [],
          multiRes: {},
        });
        break;
      case "cubemap":
        init({
          cubeMap,
          imageSource: "",
          equirectangularOptions: {},
          multiRes: {},
        });
        break;
      case "multires":
        init({
          cubeMap: [],
          imageSource: "",
          equirectangularOptions: {},
          multiRes,
        });
        break;
      default:
        break;
    }

    return () => {
      if (myPannellum) {
        if (onPanoramaLoaded) {
          myPannellum.off("load", loadHandler);
        }
        if (onPanoramaMouseDown) {
          myPannellum.off("mousedown", mouseDownHandler);
        }
        if (onPanoramaMouseUp) {
          myPannellum.off("mouseup", mouseUpHandler);
        }
        myPannellum = null;
      }
    };
    // Intentionally mount-only init to match legacy class component behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={id} style={style} className={className}>
      {children}
    </div>
  );
}

export const ReactPannellum = ReactPannellumInner as ReactPannellumComponent;

ReactPannellum.isLoaded = () => myPannellum?.isLoaded();

ReactPannellum.getPitch = () => myPannellum?.getPitch();

ReactPannellum.setPitch = (pitch, animated = 1000, callback, callbackArgs) => {
  if (myPannellum) {
    myPannellum.setPitch(pitch, animated, callback, callbackArgs);
  }
};

ReactPannellum.getPitchBounds = () => myPannellum?.getPitchBounds();

ReactPannellum.setPitchBounds = (bounds) => {
  if (myPannellum) {
    myPannellum.setPitchBounds(bounds);
  }
};

ReactPannellum.getYaw = () => myPannellum?.getYaw();

ReactPannellum.setYaw = (yaw, animated = 1000, callback, callbackArgs) => {
  if (myPannellum) {
    myPannellum.setYaw(yaw, animated, callback, callbackArgs);
  }
};

ReactPannellum.getYawBounds = () => myPannellum?.getYawBounds();

ReactPannellum.setYawBounds = (bounds) => {
  withViewer(myPannellum, (v) => v.setYawBounds(bounds));
};

ReactPannellum.getHfov = () => myPannellum?.getHfov();

ReactPannellum.setHfov = (hfov, animated = 1000, callback, callbackArgs) => {
  if (myPannellum) {
    myPannellum.setHfov(hfov, animated, callback, callbackArgs);
  }
};

ReactPannellum.getHfovBounds = () => myPannellum?.getHfovBounds();

ReactPannellum.setHfovBounds = (bounds) => {
  withViewer(myPannellum, (v) => v.setHfovBounds(bounds));
};

ReactPannellum.lookAt = (
  pitch,
  yaw,
  hfov,
  animated = 1000,
  callback,
  callbackArgs
) => {
  if (myPannellum) {
    myPannellum.lookAt(pitch, yaw, hfov, animated, callback, callbackArgs);
  }
};

ReactPannellum.getNorthOffset = () => myPannellum?.getNorthOffset();

ReactPannellum.setNorthOffset = (heading) => {
  withViewer(myPannellum, (v) => v.setNorthOffset(heading));
};

ReactPannellum.getHorizonRoll = () => myPannellum?.getHorizonRoll();

ReactPannellum.setHorizonRoll = (roll) => {
  withViewer(myPannellum, (v) => v.setHorizonRoll(roll));
};

ReactPannellum.getHorizonPitch = () => myPannellum?.getHorizonPitch();

ReactPannellum.setHorizonPitch = (pitch) => {
  withViewer(myPannellum, (v) => v.setHorizonPitch(pitch));
};

ReactPannellum.startAutoRotate = (speed, pitch) => {
  withViewer(myPannellum, (v) => v.startAutoRotate(speed, pitch));
};

ReactPannellum.stopAutoRotate = () => {
  if (myPannellum) {
    myPannellum.stopAutoRotate();
  }
};

ReactPannellum.mouseEventToCoords = (event) =>
  myPannellum?.mouseEventToCoords(event);

ReactPannellum.addScene = (sceneId, cfg, callback) => {
  if (
    sceneId &&
    sceneId !== "" &&
    cfg &&
    JSON.stringify(cfg) !== "{}"
  ) {
    withViewer(myPannellum, (v) => {
      v.addScene(sceneId, cfg);
      callback?.();
    });
  } else {
    console.log(
      "sceneId cannot be empty and config.imageSource cannot be empty!!"
    );
  }
};

ReactPannellum.getCurrentScene = () => myPannellum?.getScene();

ReactPannellum.getAllScenes = () => myPannellum?.getAllScenes();

ReactPannellum.removeScene = (sceneId, callback) => {
  if (sceneId && sceneId !== "") {
    withViewer(myPannellum, (v) => {
      v.removeScene(sceneId);
      callback?.();
    });
  } else {
    console.log("sceneId cannot be empty");
  }
};

ReactPannellum.loadScene = (
  sceneId,
  targetPitch,
  targetYaw,
  targetHfov,
  fadeDone
) => {
  if (myPannellum && sceneId && sceneId !== "") {
    myPannellum.loadScene(
      sceneId,
      targetPitch,
      targetYaw,
      targetHfov,
      fadeDone
    );
  }
};

ReactPannellum.toggleFullscreen = () => myPannellum?.toggleFullscreen();

ReactPannellum.getConfig = () => myPannellum?.getConfig();

ReactPannellum.getContainer = () => myPannellum?.getContainer();

ReactPannellum.addHotSpot = (hotspot, sceneId) => {
  if (JSON.stringify(hotspot) !== "{}") {
    withViewer(myPannellum, (v) => v.addHotSpot(hotspot, sceneId));
  } else {
    console.log(
      "hotspot cannot be empty, please check hotspot elements needed in document: config props `hotSpots`."
    );
  }
};

ReactPannellum.removeHotSpot = (hotSpotId, sceneId) => {
  if (hotSpotId !== "") {
    withViewer(myPannellum, (v) => v.removeHotSpot(hotSpotId, sceneId));
  } else {
    console.log("hotspotId cannot be empty!!");
  }
};

ReactPannellum.destroy = () => myPannellum?.destroy();

ReactPannellum.stopMovement = () => {
  myPannellum?.stopMovement();
};

ReactPannellum.resize = () => {
  myPannellum?.resize();
};

ReactPannellum.isOrientationSupported = () =>
  myPannellum?.isOrientationSupported();

ReactPannellum.stopOrientation = () => {
  myPannellum?.stopOrientation();
};

ReactPannellum.startOrientation = () => {
  myPannellum?.startOrientation();
};

ReactPannellum.isOrientationActive = () => myPannellum?.isOrientationActive();

ReactPannellum.getViewer = () => myPannellum;

ReactPannellum.getViewers = () => myViewers;

export default ReactPannellum;
