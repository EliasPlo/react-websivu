
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from "@mui/material";

const ContactList = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch the list of submissions from the backend
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("http://localhost:5000/submissions");
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Yhteydenottopyynnöt
      </Typography>
      {submissions.length === 0 ? (
        <Typography variant="body1">Ei yhteydenottopyyntojä</Typography>
      ) : (
        <List>
          {submissions.map((submission, index) => (
            <ListItem key={index} sx={{ marginBottom: 2 }}>
              <Card variant="outlined" sx={{ width: "100%" }}>
                <CardContent>
                  <Typography variant="h6">{submission.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Puhelinnumero:</strong> {submission.number}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Viesti:</strong> {submission.message}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Lähetetty:</strong> {new Date(submission.timestamp).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ContactList;

