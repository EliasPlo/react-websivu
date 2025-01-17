import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useEffect } from "react";
import styledui from "styled-components";
//import Footer from "./Footer";

const Lomake = () => {
    useEffect(() => {
        if(window.FB) {
          window.FB.XFBML.parse();
        }
      }, []);

      const StyledButton = styledui.button`
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      font-size: 16px;
      cursor: pointer;
  
      &:hover {
        background-color: #45a049;
      }
    `;

    return (
        <div className="lomake">
        <h2>Lomake</h2>
        <form>
            <label>
                Nimi: <input type="text" name="nimi" />
            </label><br />
            <label>
                Puhelin: <input type="text" name="puhelin" />
            </label><br />
            <label>
                Aihe: <input type="text" name="aihe" />
            </label><br />
            <input type="submit" value="Lähetä" />
        </form>
        <br />
        <div>
        <FontAwesomeIcon icon={faPrint} style={{ fontSize: '24px'}}/>
        <FontAwesomeIcon icon={faHome} style={{ fontSize: '24px'}}/>
        <FontAwesomeIcon icon={faPhone} style={{ fontSize: '24px'}} />
      </div>
      <div
        className="fb-like" 
        data-href="https://www.facebook.com/" 
        data-width="" 
        data-layout="button_count" 
        data-action="like" 
        data-size="small" 
        data-share="true"
        />
        <StyledButton>Klik</StyledButton>
        <div> 
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
      <Button variant="contained" color="success">Success</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="warning">Warning</Button>
      <Button variant="contained" color="info">Info</Button>
      <Button variant="contained" color="default">Default</Button>
      </div>


        </div>
    );
};

export default Lomake