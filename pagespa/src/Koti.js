import kuva1 from "./assets/kuva1.jpg";
import kuva2 from "./assets/kuva2.jpg";
import kuva3 from "./assets/kuva3.jpg";
import kuva4 from "./assets/kuva4.jpg";
import kuva5 from "./assets/kuva5.jpg";
//import kuva6 from "./assets/kuva6.jpg";
import kuva7 from "./assets/kuva7.png";
import { Card, Box, Typography, CardMedia, CardContent, Container } from "@mui/material";

const Koti = () => {
  return (
    <div>
      <Box sx={{ bgcolor: "background.paper", p: 2, m: 2, border: 1, borderRadius: 2 }}>
        <Typography variant="h4" component="div" sx={{ color: "primary.main", textAlign: "center" }}>
          Tervetuloa
        </Typography>
        <Typography variant="body1" sx={{ color: "secondary.main", mt: 1, textAlign: "center" }}>
          Tähän tekstiä. Tähän tekstiä. Tähän tekstiä.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {[kuva1, kuva2, kuva3, kuva4, kuva5, kuva7].map((kuva, index) => (
            <Card key={index} sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="200"
                image={kuva}
                alt={`Kuva ${index + 1}`}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Tämä on kuva {index + 1}.
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Koti;
