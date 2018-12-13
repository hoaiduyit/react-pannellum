import React from "react";
import PropTypes from "prop-types";
import pannellum from "../libs/pannellum.js";
import constants from "../utils/constants";
import "../css/pannellum.css";


class ReactPannellum extends React.Component {
  myPannellum = null;
  static propTypes = {
    id: PropTypes.string.isRequired,
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

    this.myPannellum = pannellum.viewer(this.props.id, {
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
    if (this.props.imageSource) {
      this.initPanalleum();
    }
  }

  static isLoaded() {
    return this.myPannellum && this.myPannellum.isLoaded();
  }

  static getPitch() {
    return this.myPannellum && this.myPannellum.getPitch();
  }

  static setPitch(pitch, animated = 1000, callback, callbackArgs) {
    if (this.myPannellum) {
      this.myPannellum.setPitch(pitch, animated, callback, callbackArgs);
    }
  }

  static getPitchBounds() {
    return this.myPannellum && this.myPannellum.getPitchBounds();
  }

  static setPitchBounds(bounds) {
    if (this.myPannellum) {
      this.myPannellum.setPitchBounds(bounds);
    }
  }

  static getYaw() {
    return this.myPannellum && this.myPannellum.getYaw();
  }

  static setYaw(yaw, animated = 1000, callback, callbackArgs) {
    if (this.myPannellum) {
      this.myPannellum.setYaw(yaw, animated, callback, callbackArgs);
    }
  }

  static getYawBounds() {
    return this.myPannellum && this.myPannellum.getYawBounds();
  }

  static setYawBounds(bounds) {
    constants
      .myPromise(this.myPannellum)
      .then(({ bounds }) => {
        this.myPannellum.setYawBounds(bounds);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getHfov() {
    return this.myPannellum && this.myPannellum.getHfov();
  }

  static setHfov(hfov, animated = 1000, callback, callbackArgs) {
    if (this.myPannellum) {
      this.myPannellum.setHfov(hfov, animated, callback, callbackArgs);
    }
  }

  static getHfovBounds() {
    return this.myPannellum && this.myPannellum.getHfovBounds();
  }

  static setHfovBounds(bounds) {
    constants
      .myPromise(this.myPannellum)
      .then(({ bounds }) => {
        this.myPannellum.setHfovBounds(bounds);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static lookAt(pitch, yaw, hfov, animated = 1000, callback, callbackArgs) {
    if (this.myPannellum) {
      this.myPannellum.lookAt(pitch, yaw, hfov, animated, callback, callbackArgs);
    }
  }

  static getNorthOffset() {
    return this.myPannellum && this.myPannellum.getNorthOffset();
  }

  static setNorthOffset(heading) {
    constants
      .myPromise(this.myPannellum)
      .then(({ heading }) => {
        this.myPannellum.setNorthOffset(heading);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getHorizonRoll() {
    return this.myPannellum && this.myPannellum.getHorizonRoll();
  }

  static setHorizonRoll(roll) {
    constants
      .myPromise(this.myPannellum)
      .then(({ roll }) => {
        this.myPannellum.setHorizonRoll(roll);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getHorizonPitch() {
    return this.myPannellum && this.myPannellum.getHorizonPitch();
  }

  static setHorizonPitch(pitch) {
    constants
      .myPromise(this.myPannellum)
      .then(({ pitch }) => {
        this.myPannellum.setHorizonPitch(pitch);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static startAutoRotate(speed) {
    constants
      .myPromise(this.myPannellum)
      .then(({ pitch }) => {
        this.myPannellum.startAutoRotate(speed);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static stopAutoRotate() {
    if (this.myPannellum) {
      this.myPannellum.stopAutoRotate();
    }
  }

  static mouseEventToCoords(event) {
    return this.myPannellum && this.myPannellum.mouseEventToCoords(event);
  }

  static addScene(sceneId, config, callback) {
    if (sceneId && sceneId !== "" && (config && config !== {})) {
      constants
        .myPromise(this.myPannellum, { sceneId, config, callback })
        .then(({ sceneId, config, callback }) => {
          this.myPannellum.addScene(sceneId, config);
          callback && callback();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(
        "sceneId cannot be empty and config.imageSource cannot be empty!!"
      );
    }
  }

  static getCurrentScene() {
    return this.myPannellum && this.myPannellum.getCurrentScene();
  }

  static getAllScenes() {
    return this.myPannellum && this.myPannellum.getAllScenes();
  }

  static removeScene(sceneId, callback) {
    if (sceneId && sceneId !== "") {
      constants
        .myPromise(this.myPannellum)
        .then(({ sceneId }) => {
          this.myPannellum.removeScene(sceneId);
          callback && callback();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("sceneId cannot be empty");
    }
  }

  static loadScene(sceneId, targetPitch, targetYaw, targetHfov, fadeDone) {
    if (this.myPannellum && sceneId && sceneId !== "") {
      this.myPannellum.loadScene(
        sceneId,
        targetPitch,
        targetYaw,
        targetHfov,
        fadeDone
      );
    }
  }

  static toggleFullscreen() {
    return this.myPannellum && this.myPannellum.toggleFullscreen();
  }

  static getConfig() {
    return this.myPannellum && this.myPannellum.getConfig();
  }

  static getContainer() {
    return this.myPannellum && this.myPannellum.getContainer();
  }

  static addHotSpot(hotspot, sceneId) {
    if (hotspot !== {}) {
      constants
        .myPromise(this.myPannellum)
        .then(({ hotspot, sceneId }) => {
          this.myPannellum.addHotSpot(hotspot, sceneId);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(
        "hotspot cannot be empty, please check hotspot elements needed in document: config props `hotSpots`."
      );
    }
  }

  static removeHotSpot(hotspotId) {
    if (hotspotId !== "") {
      constants
        .myPromise(this.myPannellum)
        .then(({ sceneId }) => {
          this.myPannellum.removeHotSpot(sceneId);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("hotspotId cannot be empty!!");
    }
  }

  render() {
    const { style, className, id } = this.props;
    return <div id={id} style={style} className={className} />;
  }
}

export default ReactPannellum;
