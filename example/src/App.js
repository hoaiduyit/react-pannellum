import React from 'react';
import ReactPannellum, { addHotSpot } from 'react-pannellum';

export default class App extends React.Component {
  onClick() {
    addHotSpot(
      {
        pitch: 14.1,
        yaw: 1.5,
        type: 'info',
        text: 'Baltimore Museum of Art',
        URL: 'https://artbma.org/'
      },
      'firstScene'
    );
  }

  render() {
    return (
      <div className="App">
        <ReactPannellum
          id="test"
          sceneId="firstScene"
          imageSource="https://pannellum.org/images/alma.jpg"
          config={{
            autoRotate: -2
          }}
          style={{
            width: '100%',
            height: '90vh'
          }}
        />
        <div style={{ cursor: 'pointer' }} onClick={this.onClick.bind(this)}>
          Add Hostpot
        </div>
      </div>
    );
  }
}
