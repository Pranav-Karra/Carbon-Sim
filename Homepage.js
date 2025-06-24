import React from 'react';
import { Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router for navigation

const Homepage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    // Add a small delay to make the transition feel more natural
    setTimeout(() => {
      navigate('/main'); // This should match the path of your main page
    }, 100);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundSize: '150%',  // This will enlarge the image to 150% of its original size
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Title Section */}
      <Box
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '80px',
          borderRadius: '16px',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          marginBottom: '40px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'Poppins',
            color: '#3f97e1',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '4px 4px 10px rgba(0, 0, 0, 0.4)',
          }}
        >
          Carbon-Sim
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#3f97e1',
            fontSize: '1.5rem',
            marginTop: '10px',
            textTransform: 'uppercase',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          A Breath Into The Future
        </Typography>
      </Box>

      {/* Button Section */}
      <Button
        variant="contained"
        size="large"
        onClick={handleStartClick}
        sx={{
            padding: '16px 40px',
            fontSize: '1.5rem',
            borderRadius: '8px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: '#3f97e1',  // Custom color here
            color: '#fff',  // Ensures the text color is white for contrast
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              backgroundColor: '#337ab7',  // Slightly darker color on hover
              transform: 'scale(1.05)',
            },
        }}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default Homepage;
