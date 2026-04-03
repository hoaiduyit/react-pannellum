import { useContext, useMemo } from "react";
import { PannellumInstanceContext } from "@/contexts/pannellumContext.js";
import { buildPannellumViewerApi } from "@/utils/buildPannellumViewerApi.js";
import type { PannellumViewerApi } from "@/types/PannellumViewerApi.js";

export type { PannellumViewerApi } from "@/types/PannellumViewerApi.js";

/**
 * Imperative API for the Pannellum instance created by the nearest parent
 * `<ReactPannellum>`. Must be called from a descendant of that component.
 */
export function usePannellum(): PannellumViewerApi {
  const ctx = useContext(PannellumInstanceContext);
  if (!ctx) {
    throw new Error(
      "usePannellum() must be used inside <ReactPannellum> (e.g. render children that call the hook, or a wrapper component).",
    );
  }
  return useMemo(() => buildPannellumViewerApi(ctx.viewerRef), [ctx.viewerRef]);
}
