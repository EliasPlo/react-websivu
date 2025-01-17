import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CameraSelection from './roadcam/camera-selection'
import CameraView from './roadcam/camera-view'
import { Box, Typography, Card, CardContent, CardHeader, Container } from '@mui/material';

const App = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  const cameraSelected = (value) => {
    setSelectedPresetId(value);
  }

    return (
      <Container maxWidth="80%" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography variant="h4" align="center" sx={{ color: "primary.main" }}>
              Traffic Camera Viewer
            </Typography>
          }
          sx={{ bgcolor: "background.paper", py: 2 }}
        />
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <CameraSelection selectedPresetId={selectedPresetId} onSelect={cameraSelected} />
          </Box>
          {selectedPresetId ? (
            <Box
              sx={{
                mt: 4,
                p: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <CameraView presetId={selectedPresetId} />
            </Box>
          ) : (
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "text.secondary", mt: 2 }}
            >
              Select a camera to view the feed.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
    );
}

App.propTypes = {
  selectedPresetId: PropTypes.string.isRequired
}

export default App;