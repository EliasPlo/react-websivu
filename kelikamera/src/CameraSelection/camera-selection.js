import React from 'react';
import PropTypes from 'prop-types';
import './camera-selection.css';

const cameras = [
    { presetId: '', name: '-' },
    { presetId: 'C0454701', name: 'vt9_Tampere_Linnainmaa' },
    { presetId: 'C0456800', name: 'vt12_Tampere_Rantatie' },
    { presetId: 'C0456900', name: 'vt12_Tampere_Santalahdenpuisto' },
    { presetId: 'C0252001', name: 'kt40_Turku_Kärsämäki' },
    { presetId: 'C0252101', name: 'kt40_Raisio' },
    { presetId: 'C0854802', name: 'st504_Polvijärvi' },
    { presetId: 'C0158000', name: 'kt50_Vantaa_Tikkurila' },
    { presetId: 'C0252900', name: 'vt1_Turku_Jaani' },
    { presetId: 'C0170602', name: 'vt1_Helsinki_Munkkiniemi' },
    { presetId: 'C0167500', name: 'kt51_Helsinki_Lauttasaari' },
    { presetId: 'C0167600', name: 'kt51_Espoo_Westend' },
    { presetId: 'C0854902', name: 'vt6_Joensuu_Honkavaara' },
    { presetId: 'C0357601', name: 'vt26_Hamina_Pyhältö' },
    { presetId: 'C0357501', name: 'vt13_Savitaipale' },
    { presetId: 'C0450701', name: 'vt3_Tampere_Lakalaiva' }
]

const CameraSelection = ({ selectedPresetId, onSelect }) => {

    const selectionChanged = (event) => {
        console.log("Selected:" + event.target.value);
        onSelect(event.target.value);
    }


    return (
        <div className="Camera-selection-container">
          <div className="Camera-selection-text">
            Select camera to show:<br />
            <form>
              <select onChange={selectionChanged} value={selectedPresetId}>
                {cameras.map((cam, i) => (
                  <option
                    key={`selection_${i}`}
                    value={cam.presetId}
                  >
                    {cam.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
    );
}

CameraSelection.propTypes = {
    selectedPresetId: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default CameraSelection;