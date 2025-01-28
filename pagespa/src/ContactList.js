import { useEffect, useState } from "react";
import { Box, Typography, Card, List, ListItem, ListItemText, Divider } from "@mui/material";

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
        Contact Form Submissions
      </Typography>
      {submissions.length === 0 ? (
        <Typography variant="body1">No submissions yet.</Typography>
      ) : (
        <List>
          {submissions.map((submission, index) => (
            <div key={index}>
              <ListItem sx={{ padding: 2 }}>
                <ListItemText
                  primary={<Typography variant="h6">{submission.name}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Phone:</strong> {submission.number}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Message:</strong> {submission.message}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Submitted at:</strong> {new Date(submission.timestamp).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ContactList;
