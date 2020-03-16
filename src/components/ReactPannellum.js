import React from 'react';
import PropTypes from 'prop-types';
import pannellum from '../libs/pannellum.js';
import constants from '../utils/constants';
import '../css/pannellum.css';

let myPannellum = null;

class ReactPannellum extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    sceneId: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    config: PropTypes.shape({}),
    className: PropTypes.string,
    style: PropTypes.shape({})
  };

  static defaultProps = {
    className: '',
    style: {
      ...constants.style
    },
    config: {
      autoLoad: false,
      autoRotate: 0,
      autoRotateInactivityDelay: 0,
      autoRotateStopDelay: 0,
      preview: '',
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

    myPannellum = pannellum.viewer(this.props.id, {
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
    return myPannellum && myPannellum.isLoaded();
  }

  static getPitch() {
    return myPannellum && myPannellum.getPitch();
  }

  static setPitch(pitch, animated = 1000, callback, callbackArgs) {
    if (myPannellum) {
      myPannellum.setPitch(pitch, animated, callback, callbackArgs);
    }
  }

  static getPitchBounds() {
    return myPannellum && myPannellum.getPitchBounds();
  }

  static setPitchBounds(bounds) {
    if (myPannellum) {
      myPannellum.setPitchBounds(bounds);
    }
  }

  static getYaw() {
    return myPannellum && myPannellum.getYaw();
  }

  static setYaw(yaw, animated = 1000, callback, callbackArgs) {
    if (myPannellum) {
      myPannellum.setYaw(yaw, animated, callback, callbackArgs);
    }
  }

  static getYawBounds() {
    return myPannellum && myPannellum.getYawBounds();
  }

  static setYawBounds(bounds) {
    constants
      .myPromise(myPannellum, { bounds })
      .then(({ bounds }) => {
        myPannellum.setYawBounds(bounds);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getHfov() {
    return myPannellum && myPannellum.getHfov();
  }

  static setHfov(hfov, animated = 1000, callback, callbackArgs) {
    if (myPannellum) {
      myPannellum.setHfov(hfov, animated, callback, callbackArgs);
    }
  }

  static getHfovBounds() {
    return myPannellum && myPannellum.getHfovBounds();
  }

  static setHfovBounds(bounds) {
    constants
      .myPromise(myPannellum, { bounds })
      .then(({ bounds }) => {
        myPannellum.setHfovBounds(bounds);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static lookAt(pitch, yaw, hfov, animated = 1000, callback, callbackArgs) {
    if (myPannellum) {
      myPannellum.lookAt(pitch, yaw, hfov, animated, callback, callbackArgs);
    }
  }

  static getNorthOffset() {
    return myPannellum && myPannellum.getNorthOffset();
  }

  static setNorthOffset(heading) {
    constants
      .myPromise(myPannellum, { heading })
      .then(({ heading }) => {
        myPannellum.setNorthOffset(heading);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getHorizonRoll() {
    return myPannellum && myPannellum.getHorizonRoll();
  }

  static setHorizonRoll(roll) {
    constants
      .myPromise(myPannellum, { roll })
      .then(({ roll }) => {
        myPannellum.setHorizonRoll(roll);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getHorizonPitch() {
    return myPannellum && myPannellum.getHorizonPitch();
  }

  static setHorizonPitch(pitch) {
    constants
      .myPromise(myPannellum, { pitch })
      .then(({ pitch }) => {
        myPannellum.setHorizonPitch(pitch);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static startAutoRotate(speed) {
    constants
      .myPromise(myPannellum, { pitch })
      .then(({ pitch }) => {
        myPannellum.startAutoRotate(speed);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static stopAutoRotate() {
    if (myPannellum) {
      myPannellum.stopAutoRotate();
    }
  }

  static mouseEventToCoords(event) {
    return myPannellum && myPannellum.mouseEventToCoords(event);
  }

  static addScene(sceneId, config, callback) {
    if (sceneId && sceneId !== '' && (config && config !== {})) {
      constants
        .myPromise(myPannellum, { sceneId, config, callback })
        .then(({ sceneId, config, callback }) => {
          myPannellum.addScene(sceneId, config);
          callback && callback();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(
        'sceneId cannot be empty and config.imageSource cannot be empty!!'
      );
    }
  }

  static getCurrentScene() {
    return myPannellum && myPannellum.getCurrentScene();
  }

  static getAllScenes() {
    return myPannellum && myPannellum.getAllScenes();
  }

  static removeScene(sceneId, callback) {
    if (sceneId && sceneId !== '') {
      constants
        .myPromise(myPannellum, { sceneId })
        .then(({ sceneId }) => {
          myPannellum.removeScene(sceneId);
          callback && callback();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('sceneId cannot be empty');
    }
  }

  static loadScene(sceneId, targetPitch, targetYaw, targetHfov, fadeDone) {
    if (myPannellum && sceneId && sceneId !== '') {
      myPannellum.loadScene(
        sceneId,
        targetPitch,
        targetYaw,
        targetHfov,
        fadeDone
      );
    }
  }

  static toggleFullscreen() {
    return myPannellum && myPannellum.toggleFullscreen();
  }

  static getConfig() {
    return myPannellum && myPannellum.getConfig();
  }

  static getContainer() {
    return myPannellum && myPannellum.getContainer();
  }

  static addHotSpot(hotspot, sceneId) {
    if (hotspot !== {}) {
      constants
        .myPromise(myPannellum, { hotspot, sceneId })
        .then(({ hotspot, sceneId }) => {
          myPannellum.addHotSpot(hotspot, sceneId);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log(
        'hotspot cannot be empty, please check hotspot elements needed in document: config props `hotSpots`.'
      );
    }
  }

  static removeHotSpot(hotspotId, sceneId) {
    if (hotspotId !== '') {
      constants
        .myPromise(myPannellum, { sceneId })
        .then(({ sceneId }) => {
          myPannellum.removeHotSpot(sceneId);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('hotspotId cannot be empty!!');
    }
  }

  render() {
    const { style, className, id } = this.props;
    return <div id={id} style={style} className={className} />;
  }
}

export default ReactPannellum;
