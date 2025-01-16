import React from 'react';
import PropTypes from 'prop-types';

const CameraView = ({presetId}) => {

        return (
        <div className="Camera-selection-container">
            <img
                src={ `http://weathercam.digitraffic.fi/${presetId}.jpg`}
                alt={ `Camera ${presetId}`}
             />
        </div>
    );
};
CameraView.propTypes = {
    presetId: PropTypes.string.isRequired
};

export default CameraView;