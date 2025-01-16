import React from 'react'; // React-kirjaston tuonti
import PropTypes from 'prop-types'; // PropTypes-tarkistusten tuonti
import './camera-selection.css'; // Tyylitiedoston tuonti

// Kameradata määritelty taulukkoon, joka sisältää esiasetusten tunnisteet (presetId) ja nimet
const cameras = [
    { presetId: '', name: '-' }, // Tyhjä vaihtoehto oletuksena
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

// CameraSelection-komponentti
const CameraSelection = ({ selectedPresetId, onSelect }) => {

    // Funktio, joka käsittelee valinnan muuttumisen
    const selectionChanged = (event) => {
        console.log("Selected:" + event.target.value); // Tulostaa valitun kameran konsoliin
        onSelect(event.target.value); // Kutsuu yläkomponentilta saatua onSelect-funktiota
    }

    return (
        <div className="Camera-selection-container">
          {/* Ohjeteksti kameran valitsemiseen */}
          <div className="Camera-selection-text">
            Select camera to show:<br />
            <form>
              {/* Dropdown-valikko, joka sisältää kaikki kameravaihtoehdot */}
              <select onChange={selectionChanged} value={selectedPresetId}>
                {/* Luodaan <option>-elementit kamerataulukosta */}
                {cameras.map((cam, i) => (
                  <option
                    key={`selection_${i}`} // Avain jokaiselle <option>-elementille
                    value={cam.presetId} // Kameran esiasetuksen tunniste
                  >
                    {cam.name} {/* Kameran nimi, joka näkyy valikossa */}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
    );
}

// PropTypes-määritykset komponentin propseille
CameraSelection.propTypes = {
    selectedPresetId: PropTypes.string.isRequired, // Valittu kameran esiasetus (pakollinen)
    onSelect: PropTypes.func.isRequired // Funktio, joka käsittelee valinnan muutoksen (pakollinen)
}

export default CameraSelection; // Komponentin vienti
