import pannellum from "./libs/pannellum.js";
import type { PannellumViewer } from "./types/PannellumViewer.js";

export function createPannellumViewer(
  containerId: string,
  config: Record<string, unknown>
): PannellumViewer {
  return pannellum.viewer(containerId, config);
}
