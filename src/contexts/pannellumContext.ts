import { createContext } from "react";
import type { RefObject } from "react";
import type { PannellumViewer } from "@/types/PannellumViewer.js";

export type PannellumContextValue = {
  viewerRef: RefObject<PannellumViewer | null>;
};

export const PannellumInstanceContext = createContext<PannellumContextValue | null>(
  null
);
