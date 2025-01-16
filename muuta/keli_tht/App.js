import React, { useState } from 'react'; // React-kirjaston tuonti ja useState-hook
import PropTypes from 'prop-types'; // PropTypes-tarkistusten tuonti
import './App.css'; // Tyylitiedoston tuonti
import CameraSelection from './CameraSelection/camera-selection'; // CameraSelection-komponentin tuonti
import CameraView from './CameraView/camera-view'; // CameraView-komponentin tuonti

const App = () => {
  // Tilamuuttuja valitulle kameran esiasetukselle (presetId)
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  // Funktio, joka päivittää valitun kameran esiasetuksen
  const cameraSelected = (value) => {
    setSelectedPresetId(value);
  }

  return (
    <div className="app">
      {/* Sovelluksen otsikko */}
      <div className="app-header">
        <h2>Traffic Camera Viewer - Tampere</h2>
      </div>

      {/* CameraSelection-komponentti, joka välittää valitun presetId:n ja päivitysfunktiot */}
      <CameraSelection
        selectedPresetId={selectedPresetId}
        onSelect={cameraSelected}
      />

      {/* Näyttää CameraView-komponentin vain, jos presetId on valittu */}
      {selectedPresetId ? (
        <div className="camera-container">
          <CameraView presetId={selectedPresetId} />
        </div>
      ) : null}
    </div>
  );
}

// PropTypes-määritys varmistaa, että selectedPresetId on merkkijono ja pakollinen
App.propTypes = {
  selectedPresetId: PropTypes.string.isRequired
}

export default App; // Komponentin vienti
