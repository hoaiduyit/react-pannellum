const uiText = {
  loadButtonLabel: "Click to<br>Load<br>Panorama",
  loadingLabel: "Loading...",
  bylineLabel: "by %s",
  noPanoramaError: "No panorama image was specified.",
  fileAccessError: "The file %s could not be accessed.",
  malformedURLError: "There is something wrong with the panorama URL.",
  iOS8WebGLError:
    "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
  genericWebGLError:
    "Your browser does not have the necessary WebGL support to display this panorama.",
  textureSizeError:
    "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
  unknownError: "Unknown error. Check developer console."
};

const style = {
  width: "600px",
  height: "400px",
  background: "#000000"
};

export default { uiText, style };
export { uiText, style };
