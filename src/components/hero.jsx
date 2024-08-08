import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '../themes/themeContext.jsx';
import { useNavigate } from 'react-router-dom';


export default function Hero() {
  const { mode } = useTheme();

const navigate = useNavigate();

  const textColor = mode === 'dark' ? '#fff' : '#000';

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Blurred background image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: mode==="dark" ?'url(https://img.freepik.com/free-photo/view-3d-movie-theater-seating_23-2151005444.jpg?t=st=1721659537~exp=1721663137~hmac=62d68b906927f435e7f73df49a57fa283aed498f2eb8b1587a7dc6c3093e54b2&w=740)'
          : 'url(https://img.freepik.com/free-photo/cinema-still-life_23-2148017314.jpg?t=st=1721657952~exp=1721661552~hmac=acc0063145629c197267184db707d8394d7f4593541ee320bd893765d224b2fb&w=740)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)',
          zIndex: 1,
        }}
      />
      {/* Text content */}
      <Stack
  spacing={2}
  sx={{
    textAlign: 'center',
    color: textColor,
    position: 'relative',
    zIndex: 2,
    maxWidth: 600,
    mx: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }}
>
  <Typography variant="h2" sx={{fontFamily:'MV Boli '}}>
  "Maximize Your Reach, Optimize Your Revenue – The Future of Movie Ticketing is Here."
  </Typography>
  {/* <Typography >Create Your Role..</Typography> */}
  <Button
    variant="outlined"
    size="small"
    sx={{
      mt: 3,
      width: 200,
      fontWeight: 600,
      borderRadius: 10,
      padding: '6px 12px',
 
      fontSize: 14,
      color: mode === "dark" ? "#000" : "#fff",
      backgroundColor: mode === "dark" ? "#fff" : "#000",
      border: 'none',
      transition: 'all 0.5s ease-out',
      '&:hover': {
        // backgroundColor: mode === "dark" ? "#161515" : "#ccc",
        color: mode === "dark" ? "#fff" : "#000",
        cursor: 'pointer',
      
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.2)',
        border: mode === "dark" ? '1px solid #fff' : '1px solid #000',
        transform: 'scale(1.04)',
      },
    }}
    onClick={()=>navigate('/admin/dashboard')}
  >
    Explore More...
  </Button>
</Stack>


    </Box>
  );
}
