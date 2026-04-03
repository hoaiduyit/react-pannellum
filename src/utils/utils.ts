import type { PannellumViewer } from "@/types/PannellumViewer.js";

const VIEWER_NOT_READY = "[react-pannellum] Viewer is not ready yet.";

/** Run `fn` with the active Pannellum instance when it exists; otherwise log a console warning. */
export function withViewer(
  viewer: PannellumViewer | null | undefined,
  fn: (viewer: PannellumViewer) => void
): void {
  if (!viewer) {
    console.warn(VIEWER_NOT_READY);
    return;
  }
  fn(viewer);
}
