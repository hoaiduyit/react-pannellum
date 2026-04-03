import type { PannellumViewer } from "@/types/PannellumViewer.js";

const globalViewers: PannellumViewer[] = [];

export function registerViewer(v: PannellumViewer): void {
  globalViewers.push(v);
}

export function unregisterViewer(v: PannellumViewer): void {
  const i = globalViewers.indexOf(v);
  if (i >= 0) {
    globalViewers.splice(i, 1);
  }
}

export function getRegisteredViewers(): readonly PannellumViewer[] {
  return globalViewers;
}
