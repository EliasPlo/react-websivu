import { useState } from "react";
import { Button } from "@mui/material";

const Yhteys = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
    
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log({name, number, message});
  }

  const hadleClear = () => {
    setName('');
    setNumber('');
    setMessage('');
  }

  return (
    <div className="lomake">
    <h2>Yhteydenottolomake</h2>
    <form onSubmit={handleSubmit}>
        <label>
            <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type="text" 
            name="nimi" 
            placeholder="Nimi" 
            />
        </label><br />
        <label>
            <input
            onChange={(e) => setNumber(e.target.value)} 
            value={number} type="tel" 
            name="puhelin" 
            placeholder="Puhelinnumero" 
            />
        </label><br />
        <label>
            <textarea 
            onChange={(e) => setMessage(e.target.value)} 
            value={message} 
            type="text" name="aihe" 
            placeholder="Kirjoita aihe"
            />
        </label><br />
        <Button type="submit" variant="contained" color="primary">Lähetä</Button>
        <Button type="button" variant="contained" color="primary" onClick={hadleClear}>Tyhjennä</Button>
    </form>
    </div>
)
}

export default Yhteys;
