import React from 'react'; // React-kirjaston tuonti
import PropTypes from 'prop-types'; // PropTypes-tarkistusten tuonti

// CameraView-komponentti näyttää valitun kameran näkymän
const CameraView = ({ presetId }) => {
    return (
        <div className="Camera-selection-container">
            {/* Kuvan lähteenä käytetään Digitrafficin kamera-URL-osoitetta ja valittua presetId:tä */}
            <img
                src={`http://weathercam.digitraffic.fi/${presetId}.jpg`} // Kameran kuvan URL
                alt={`Camera ${presetId}`} // Alt-teksti, joka kertoo kameran tunnisteen
            />
        </div>
    );
};

// PropTypes-määritykset varmistavat, että presetId on merkkijono ja pakollinen
CameraView.propTypes = {
    presetId: PropTypes.string.isRequired // Valitun kameran tunniste (pakollinen)
};

export default CameraView; // Komponentin vienti
