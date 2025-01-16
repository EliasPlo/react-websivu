import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CameraSelection from './CameraSelection/camera-selection'
import CameraView from './CameraView/camera-view'

class App extends Component {

  constructor() {
    super();
    this.state = { selectedPresetId: null }
  }

  cameraSelected = (value) => {
    this.setState({ selectedPresetId: value });
  }

  render = () => {
    const { selectedPresetId } = this.state;
    return (
      <div className="app">
        <div className="app-header">
          <h2>Traffic Camera Viewer - Tampere</h2>
        </div>
        <CameraSelection
          selectedPresetId={this.state.selectedPresetId}
          onSelect={(value) => this.cameraSelected(value)}
        />
        {selectedPresetId ?
          <div className="camera-container">
            <CameraView presetId={selectedPresetId} />
          </div>
          : null
        }
      </div>
    );
  }
}

App.propTypes = {
  selectedPresetId: PropTypes.string.isRequired
}

export default App;