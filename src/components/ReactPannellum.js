import React from "react";
import PropTypes from "prop-types";
import pannellum from "../libs/pannellum.js";
import constants from "../utils/constants";
import "../css/pannellum.css";

let myPannellum = undefined;

class ReactPannellum extends React.Component {
  static propTypes = {
    sceneId: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    config: PropTypes.shape({}),
    className: PropTypes.string,
    style: PropTypes.shape({})
  };

  static defaultProps = {
    className: "",
    style: {
      ...constants.style
    },
    config: {
      autoLoad: false,
      autoRotate: 0,
      autoRotateInactivityDelay: 0,
      autoRotateStopDelay: 0,
      preview: "",
      uiText: {
        ...constants.uiText
      },
      showZoomCtrl: true,
      keyboardZoom: true,
      mouseZoom: true,
      doubleClickZoom: false,
      draggable: true,
      disableKeyboardCtrl: false,
      showFullscreenCtrl: true,
      showControls: true,
      yaw: 0,
      pitch: 0,
      maxPitch: 90,
      minPitch: -90,
      maxYaw: 180,
      minYaw: -180,
      hfov: 100,
      compass: false,
      northOffset: 0,
      hotSpots: [],
      hotSpotDebug: false
    }
  };

  initPanalleum() {
    const {
      sceneId,
      config,
      imageSource,
      autoRotate,
      autoRotateSpeep
    } = this.props;

    myPannellum = pannellum.viewer("react-pannellum", {
      default: {
        firstScene: sceneId
      },
      scenes: {
        [sceneId]: {
          ...config,
          imageSource
        }
      }
    });
  }

  componentDidMount() {
    if (!myPannellum && this.props.imageSource) {
      // make sure that your pannellum has enough time to load
      setTimeout(() => {
        this.initPanalleum();
      }, 100);
    }
  }

  static addScene(sceneId, config) {
    if (myPannellum) {
      myPannellum.addScene(sceneId, config);
    }
  }

  static getCurrentScene() {
    return myPannellum && myPannellum.getCurrentScene();
  }

  static getAllScenes() {
    return myPannellum && myPannellum.getAllScenes();
  }

  render() {
    const { style, className } = this.props;
    return <div id="react-pannellum" style={style} className={className} />;
  }
}

const addScene = ReactPannellum.addScene;

const getCurrentScene = ReactPannellum.getCurrentScene;

const getAllScenes = ReactPannellum.getAllScenes;

export default { ReactPannellum, addScene, getCurrentScene, getAllScenes };
export { ReactPannellum, addScene, getCurrentScene, getAllScenes };
