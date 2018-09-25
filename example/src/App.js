import React from "react";
import { ReactPannellum, addScene, getAllScenes } from "react-pannellum";

export default class App extends React.Component {
  onClick() {
    addScene("secondScene", {
      imageSource: "https://pannellum.org/images/cerro-toco-0.jpg"
    });
    console.log(getAllScenes());
  }

  render() {
    return (
      <div className="App">
        <ReactPannellum
          sceneId="firstScene"
          imageSource="https://pannellum.org/images/alma.jpg"
          config={{
            autoRotate: -2
          }}
        />
        <div onClick={this.onClick.bind(this)}>+</div>
      </div>
    );
  }
}
