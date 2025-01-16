import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './camera-selection.css';

// http://tie.digitraffic.fi/api/v1/metadata/camera-stations
// http://tie.digitraffic.fi/api/v1/data/camera-data/{id}
const cameras = [
    { presetId: '', name: '-' },
    { presetId: 'C0454801', name: 'Lielahti, Ylöjärvelle päin' },
    { presetId: 'C0454802', name: 'Lielahti, Tampereelle päin' },
    { presetId: 'C0460900', name: 'Rantatunnelin suu, itä' },
    { presetId: 'C1850301', name: 'Hervannan valtavä, Hervantaan päin' },
    { presetId: 'C1850302', name: 'Hervannan valtavä, Keskustaan/Kalevaan päin' },
    { presetId: 'C0450702', name: 'Lakalaiva, Helsinkiin päin' },
    { presetId: 'C0450701', name: 'Lakalaiva, Vaasaan päin' }
]

class CameraSelection extends Component {

    selectionChanged = (event) => {
        console.log("Selected:" + event.target.value);
        this.props.onSelect(event.target.value);
    }

    render = () => {
        const { selectedPresetId } = this.props;
        return <div className="Camera-selection-container">
            <div className="Camera-selection-text">
                Select camera to show:<br />
                <form>
                    <select onChange={this.selectionChanged} value={selectedPresetId}>
                        {
                            cameras.map((cam, i) =>
                                <option
                                    key={'selection_' + i}
                                    value={cam.presetId}>
                                    {cam.name}
                                </option>)
                        }
                    </select>
                </form>
            </div>
        </div>
    }
}

CameraSelection.propTypes = {
    selectedPresetId: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default CameraSelection;