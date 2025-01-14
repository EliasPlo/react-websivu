import React, { useEffect } from "react";
import kuva1 from "./assets/kuva1.jpg";
import kuva2 from "./assets/kuva2.jpg";
import kuva3 from "./assets/kuva3.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Koti = () => {
  useEffect(() => {
    if(window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);
  
  return (
    <div>
      <h2>Moikka</h2>
      <p>Tähän tekstiä. Tähän tekstiä. Tähän tekstiä..</p>
      <div className="img_container">
      <img className="image1" src={kuva1} alt="kuva2"></img>
      <img className="image1" src={kuva2} alt="kuva2"></img>
      <img className="image1" src={kuva3} alt="kuva2"></img>
      </div>
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
        data-share="true"/>
    </div>
  );
};

export default Koti;
