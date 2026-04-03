import type { RefObject } from "react";
import { withViewer } from "@/utils/utils.js";
import type { PannellumViewer } from "@/types/PannellumViewer.js";
import type { PannellumViewerApi } from "@/types/PannellumViewerApi.js";
import { getRegisteredViewers } from "@/utils/viewerRegistry.js";

export function buildPannellumViewerApi(
  viewerRef: RefObject<PannellumViewer | null>,
): PannellumViewerApi {
  const get = () => viewerRef.current;

  return {
    isLoaded: get()?.isLoaded() ?? false,
    getPitch: () => get()?.getPitch(),
    setPitch: (pitch, animated = 1000, callback, callbackArgs) => {
      const v = get();
      if (v) {
        v.setPitch(pitch, animated, callback, callbackArgs);
      }
    },
    getPitchBounds: () => get()?.getPitchBounds(),
    setPitchBounds: (bounds) => {
      const v = get();
      if (v) {
        v.setPitchBounds(bounds);
      }
    },
    getYaw: () => get()?.getYaw(),
    setYaw: (yaw, animated = 1000, callback, callbackArgs) => {
      const v = get();
      if (v) {
        v.setYaw(yaw, animated, callback, callbackArgs);
      }
    },
    getYawBounds: () => get()?.getYawBounds(),
    setYawBounds: (bounds) => withViewer(get(), (v) => v.setYawBounds(bounds)),
    getHfov: () => get()?.getHfov(),
    setHfov: (hfov, animated = 1000, callback, callbackArgs) => {
      const v = get();
      if (v) {
        v.setHfov(hfov, animated, callback, callbackArgs);
      }
    },
    getHfovBounds: () => get()?.getHfovBounds(),
    setHfovBounds: (bounds) =>
      withViewer(get(), (v) => v.setHfovBounds(bounds)),
    lookAt: (pitch, yaw, hfov, animated = 1000, callback, callbackArgs) => {
      const v = get();
      if (v) {
        v.lookAt(pitch, yaw, hfov, animated, callback, callbackArgs);
      }
    },
    getNorthOffset: () => get()?.getNorthOffset(),
    setNorthOffset: (heading) =>
      withViewer(get(), (v) => v.setNorthOffset(heading)),
    getHorizonRoll: () => get()?.getHorizonRoll(),
    setHorizonRoll: (roll) => withViewer(get(), (v) => v.setHorizonRoll(roll)),
    getHorizonPitch: () => get()?.getHorizonPitch(),
    setHorizonPitch: (pitch) =>
      withViewer(get(), (v) => v.setHorizonPitch(pitch)),
    startAutoRotate: (speed, pitch) =>
      withViewer(get(), (v) => v.startAutoRotate(speed, pitch)),
    stopAutoRotate: () => {
      get()?.stopAutoRotate();
    },
    mouseEventToCoords: (event) => get()?.mouseEventToCoords(event),
    addScene: (sceneId, cfg, callback) => {
      if (sceneId && sceneId !== "" && cfg && JSON.stringify(cfg) !== "{}") {
        withViewer(get(), (v) => {
          v.addScene(sceneId, cfg);
          callback?.();
        });
      } else {
        console.log(
          "sceneId cannot be empty and config.imageSource cannot be empty!!",
        );
      }
    },
    getCurrentScene: () => get()?.getScene(),
    getAllScenes: () => get()?.getAllScenes(),
    removeScene: (sceneId, callback) => {
      if (sceneId && sceneId !== "") {
        withViewer(get(), (v) => {
          v.removeScene(sceneId);
          callback?.();
        });
      } else {
        console.log("sceneId cannot be empty");
      }
    },
    loadScene: (sceneId, targetPitch, targetYaw, targetHfov, fadeDone) => {
      const v = get();
      if (v && sceneId && sceneId !== "") {
        v.loadScene(sceneId, targetPitch, targetYaw, targetHfov, fadeDone);
      }
    },
    toggleFullscreen: () => get()?.toggleFullscreen(),
    getConfig: () => get()?.getConfig(),
    getContainer: () => get()?.getContainer(),
    addHotSpot: (hotspot, sceneId) => {
      if (JSON.stringify(hotspot) !== "{}") {
        withViewer(get(), (v) => v.addHotSpot(hotspot, sceneId));
      } else {
        console.log(
          "hotspot cannot be empty, please check hotspot elements needed in document: config props `hotSpots`.",
        );
      }
    },
    removeHotSpot: (hotSpotId, sceneId) => {
      if (hotSpotId !== "") {
        withViewer(get(), (v) => v.removeHotSpot(hotSpotId, sceneId));
      } else {
        console.log("hotspotId cannot be empty!!");
      }
    },
    destroy: () => get()?.destroy(),
    stopMovement: () => {
      get()?.stopMovement();
    },
    resize: () => {
      get()?.resize();
    },
    isOrientationSupported: get()?.isOrientationSupported() ?? false,
    stopOrientation: () => {
      get()?.stopOrientation();
    },
    startOrientation: () => {
      get()?.startOrientation();
    },
    isOrientationActive: get()?.isOrientationActive() ?? false,
    getViewer: () => get(),
    getViewers: () => [...getRegisteredViewers()],
  };
}
