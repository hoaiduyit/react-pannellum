import React, { useEffect, useMemo, useRef } from "react";
import { createPannellumViewer } from "@/pannellumBridge.js";
import { configs } from "@/utils/constants.js";
import type { PannellumViewer } from "@/types/PannellumViewer.js";
import type { ReactPannellumConfig } from "@/types/ReactPannellumConfig.js";
import { PannellumInstanceContext } from "@/contexts/pannellumContext.js";
import { registerViewer, unregisterViewer } from "@/utils/viewerRegistry.js";
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
  config?: ReactPannellumConfig;
  className?: string;
  style?: React.CSSProperties;
  onPanoramaLoaded?: () => void;
  onPanoramaMouseDown?: (event: unknown) => void;
  onPanoramaMouseUp?: (event: unknown) => void;
}

export type {
  PannellumHotSpot,
  PannellumUiText,
  ReactPannellumConfig,
} from "@/types/ReactPannellumConfig.js";

export default function ReactPannellum(props: ReactPannellumProps) {
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

  const viewerRef = useRef<PannellumViewer | null>(null);
  const ctxValue = useMemo(() => ({ viewerRef }), []);

  useEffect(() => {
    let viewer: PannellumViewer | null = null;

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
      viewer = createPannellumViewer(id, {
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
            }),
          ),
        },
      });
      viewerRef.current = viewer;
      registerViewer(viewer);
      if (onPanoramaLoaded) {
        viewer.on("load", loadHandler);
      }
      if (onPanoramaMouseDown) {
        viewer.on("mousedown", mouseDownHandler);
      }
      if (onPanoramaMouseUp) {
        viewer.on("mouseup", mouseUpHandler);
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
      if (viewer) {
        if (onPanoramaLoaded) {
          viewer.off("load", loadHandler);
        }
        if (onPanoramaMouseDown) {
          viewer.off("mousedown", mouseDownHandler);
        }
        if (onPanoramaMouseUp) {
          viewer.off("mouseup", mouseUpHandler);
        }
        unregisterViewer(viewer);
        viewerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PannellumInstanceContext.Provider value={ctxValue}>
      <div id={id} style={style} className={className}>
        {children}
      </div>
    </PannellumInstanceContext.Provider>
  );
}

export { ReactPannellum };
