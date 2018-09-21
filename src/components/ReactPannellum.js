import React from "react";
import PropTypes from "prop-types";
import pannellum from "../libs/pannellum.js";
import "../css/pannellum.css";

export default class Pannellum extends React.Component {
  static propTypes = {
    imageSource: PropTypes.string.isRequired,
    autoLoad: PropTypes.boolean,
    autoRotate: PropTypes.boolean,
    autoRotateSpeep: PropTypes.number,
    autoRotateInactivityDelay: PropTypes.number,
    autoRotateStopDelay: PropTypes.number,
    previewImage: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    uiText: PropTypes.shape({})
  };

  static defaultProps = {
    autoLoad: false,
    autoRotate: false,
    autoRotateSpeep: -2,
    autoRotateInactivityDelay: 0,
    autoRotateStopDelay: 0,
    previewImage: "",
    className: "",
    style: {
      width: "600px",
      height: "400px",
      background: "#000000"
    },
    uiText: {
      loadingLabel: "Loading..."
    }
  };

  componentDidMount() {
    const {
      imageSource,
      autoLoad,
      autoRotate,
      autoRotateSpeep,
      autoRotateInactivityDelay,
      autoRotateStopDelay,
      previewImage,
      uiText
    } = this.props;
    const myPannellum = pannellum.viewer("react-pannellum", {
      type: "equirectangular",
      panorama: imageSource,
      autoLoad,
      autoRotate: autoRotate ? autoRotateSpeep : 0,
      autoRotateInactivityDelay,
      autoRotateStopDelay,
      preview: previewImage,
      strings: uiText
    });
  }

  render() {
    const { style, className } = this.props;
    return <div id="react-pannellum" style={style} className={className} />;
  }
}
