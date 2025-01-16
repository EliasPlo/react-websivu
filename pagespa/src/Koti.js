
import kuva1 from "./assets/kuva1.jpg";
import kuva2 from "./assets/kuva2.jpg";
import kuva3 from "./assets/kuva3.jpg";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const Koti = () => {

  
  return (
    <div>
      <Box sx={{ bgcolor: 'background.paper', p: 1, m: 1, border: 1 }}>
        <Typography variant="h4" component="div">
            <Box sx={{ color: 'info.main' }}>Tervetuloa</Box>
        </Typography>
        <Typography variant="body1">
        <Box sx={{ color: 'secondary.main' }}>Tähän tekstiä. Tähän tekstiä. Tähän tekstiä..</Box> 
        </Typography>
      </Box>
      
      <Typography variant="h5">
        
      </Typography>
      
      <br />
      <div className="img_container">
      <img className="image1" src={kuva1} alt="kuva2"></img>
      <img className="image1" src={kuva2} alt="kuva2"></img>
      <img className="image1" src={kuva3} alt="kuva2"></img>
      </div>

      <Button variant="contained">Klik</Button>
    </div>
  );
};

export default Koti;
