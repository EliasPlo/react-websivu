import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CameraSelection from './CameraSelection/camera-selection'
import CameraView from './CameraView/camera-view'

const App = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  const cameraSelected = (value) => {
    setSelectedPresetId(value);
  }

    return (
      <div className="app">
      <div className="app-header">
        <h2>Traffic Camera Viewer - Tampere</h2>
      </div>
      <CameraSelection
        selectedPresetId={selectedPresetId}
        onSelect={cameraSelected}
      />
      {selectedPresetId ? (
        <div className="camera-container">
          <CameraView presetId={selectedPresetId} />
        </div>
      ) : null}
    </div>
    );
}

App.propTypes = {
  selectedPresetId: PropTypes.string.isRequired
}

export default App;