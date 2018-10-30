import React from "react";
import ReactPannellum, {
  addScene,
  getAllScenes,
  loadScene,
  getConfig
} from "react-pannellum";

export default class App extends React.Component {
  state = {
    loaded: false
  };

  onClick() {
    this.setState({
      loaded: true
    });
    addScene(
      "secondScene",
      {
        imageSource: "https://pannellum.org/images/cerro-toco-0.jpg"
      },
      () => {
        loadScene("secondScene");
        console.log(getConfig());
      }
    );
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
          style={{
            width: "100%",
            height: "90vh"
          }}
        />
        <div style={{ cursor: "pointer" }} onClick={this.onClick.bind(this)}>
          +
        </div>
      </div>
    );
  }
}
