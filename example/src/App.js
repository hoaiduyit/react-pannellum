import React from "react";
import ReactPannellum, { addHotSpot } from "react-pannellum";

export const equirectangularExample = {
  imageSource: "https://pannellum.org/images/alma.jpg",
  equirectangularOptions: {},
};

export const cubeMapExample = {
  type: "cubemap",
  cubeMap: [
    "https://pannellum.org/images/wyman-park-playground-cubic/face0.jpg",
    "https://pannellum.org/images/wyman-park-playground-cubic/face1.jpg",
    "https://pannellum.org/images/wyman-park-playground-cubic/face2.jpg",
    "https://pannellum.org/images/wyman-park-playground-cubic/face3.jpg",
    "https://pannellum.org/images/wyman-park-playground-cubic/face4.jpg",
    "https://pannellum.org/images/wyman-park-playground-cubic/face5.jpg",
  ],
};

export default class App extends React.Component {
  onClick() {
    addHotSpot(
      {
        pitch: 14.1,
        yaw: 1.5,
        type: "info",
        text: "Baltimore Museum of Art",
        URL: "https://artbma.org/",
      },
      "firstScene"
    );
  }

  render() {
    return (
      <div className="App">
        <ReactPannellum
          id="test"
          sceneId="firstScene"
          // equirectangular
          {...equirectangularExample}
          // cubemap
          // {...cubeMapExample}
          config={{
            autoRotate: -2,
            author: "Author",
            title: "Title",
            description: "Deescription",
          }}
          style={{
            width: "100%",
            height: "90vh",
          }}
        />
        <div style={{ cursor: "pointer" }} onClick={this.onClick.bind(this)}>
          Add Hostpot
        </div>
      </div>
    );
  }
}
