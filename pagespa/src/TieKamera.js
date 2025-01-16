import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CameraSelection from './roadcam/camera-selection'
import CameraView from './roadcam/camera-view'

const App = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  const cameraSelected = (value) => {
    setSelectedPresetId(value);
  }

    return (
      <div className="kamera-app">
      <div className="kamera-header">
        <h2>Traffic Camera Viewer</h2>
      </div>
      <CameraSelection
        selectedPresetId={selectedPresetId}
        onSelect={cameraSelected}
      />
      <br />
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