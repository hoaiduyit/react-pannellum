import type { PannellumViewer } from "../types/PannellumViewer.js";

declare const pannellum: {
  viewer: (containerId: string, config: Record<string, unknown>) => PannellumViewer;
};

export default pannellum;
