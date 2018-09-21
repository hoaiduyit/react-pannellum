import React from "react";
import ReactPannellum from "react-pannellum";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ReactPannellum
          imageSource="https://pannellum.org/images/alma.jpg"
          autoRotate
        />
      </div>
    );
  }
}
