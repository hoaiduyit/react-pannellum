import ReactPannellum from "./components/ReactPannellum.jsx";

const addScene = ReactPannellum.addScene;

const getCurrentScene = ReactPannellum.getCurrentScene;

const getAllScenes = ReactPannellum.getAllScenes;

const removeScene = ReactPannellum.removeScene;

const loadScene = ReactPannellum.loadScene;

const isLoaded = ReactPannellum.isLoaded;

const getPitch = ReactPannellum.getPitch;

const setPitch = ReactPannellum.setPitch;

const getPitchBounds = ReactPannellum.getPitchBounds;

const setPitchBounds = ReactPannellum.setPitchBounds;

const getYaw = ReactPannellum.getYaw;

const setYaw = ReactPannellum.setYaw;

const getYawBounds = ReactPannellum.getYawBounds;

const setYawBounds = ReactPannellum.setYawBounds;

const getHfov = ReactPannellum.getHfov;

const setHfov = ReactPannellum.setHfov;

const getHfovBounds = ReactPannellum.getHfovBounds;

const setHfovBounds = ReactPannellum.setHfovBounds;

const lookAt = ReactPannellum.lookAt;

const getNorthOffset = ReactPannellum.getNorthOffset;

const setNorthOffset = ReactPannellum.setNorthOffset;

const getHorizonRoll = ReactPannellum.getHorizonRoll;

const setHorizonRoll = ReactPannellum.setHorizonRoll;

const getHorizonPitch = ReactPannellum.getHorizonPitch;

const setHorizonPitch = ReactPannellum.setHorizonPitch;

const startAutoRotate = ReactPannellum.startAutoRotate;

const stopAutoRotate = ReactPannellum.stopAutoRotate;

const mouseEventToCoords = ReactPannellum.mouseEventToCoords;

const toggleFullscreen = ReactPannellum.toggleFullscreen;

const getConfig = ReactPannellum.getConfig;

const getContainer = ReactPannellum.getContainer;

const addHotSpot = ReactPannellum.addHotSpot;

const removeHotSpot = ReactPannellum.removeHotSpot;

const destroy = ReactPannellum.destroy;

const stopMovement = ReactPannellum.stopMovement;

const resize = ReactPannellum.resize;

const isOrientationSupported = ReactPannellum.isOrientationSupported;

const stopOrientation = ReactPannellum.stopOrientation;

const startOrientation = ReactPannellum.startOrientation;

const isOrientationActive = ReactPannellum.isOrientationActive;

const getViewer = ReactPannellum.getViewer;

export default ReactPannellum;

export {
  addScene,
  getCurrentScene,
  getAllScenes,
  removeScene,
  loadScene,
  isLoaded,
  getPitch,
  setPitch,
  getPitchBounds,
  setPitchBounds,
  getYaw,
  setYaw,
  getYawBounds,
  setYawBounds,
  getHfov,
  setHfov,
  getHfovBounds,
  setHfovBounds,
  lookAt,
  getNorthOffset,
  setNorthOffset,
  getHorizonRoll,
  setHorizonRoll,
  getHorizonPitch,
  setHorizonPitch,
  startAutoRotate,
  stopAutoRotate,
  mouseEventToCoords,
  toggleFullscreen,
  getConfig,
  getContainer,
  addHotSpot,
  removeHotSpot,
  destroy,
  stopMovement,
  resize,
  isOrientationSupported,
  stopOrientation,
  startOrientation,
  isOrientationActive,
  getViewer,
};
