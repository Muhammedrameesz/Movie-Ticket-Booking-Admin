import React from "react";
import { Card, CardContent, CardActions, Stack, Box, Typography } from "@mui/material";
import { useTheme } from "../themes/themeContext.jsx";
import Image from "../images/Movies.png";

function Footer() {
  const { mode } = useTheme();

  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const socialLinks = [
    { src: "https://img.icons8.com/?size=48&id=ho8QlOYvMuG3&format=png", alt: "G-mail", url: "https://mail.google.com/mail/" },
    { src: "https://img.icons8.com/?size=48&id=13930&format=png", alt: "LinkedIn", url: "https://in.linkedin.com/" },
    { src: "https://img.icons8.com/?size=48&id=ClbD5JTFM7FA&format=png", alt: "TwitterX", url: "https://twitter.com/?lang=en" },
    { src: "https://img.icons8.com/?size=48&id=32323&format=png", alt: "Instagram", url: "https://www.instagram.com/" },
    { src: "https://img.icons8.com/?size=48&id=AZOZNnY73haj&format=png", alt: "GitHub", url: "https://github.com/" }
  ];

  return (
    <footer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mx: { xs: "10px", md: "230px" },
          maxWidth: { xs: "100%", md: "1100px" },
          mt: "auto",
        }}
      >
        <Card
          sx={{
            backgroundColor: mode === "dark" ? "#080808" : "#d4d4d4",
            width: "100%",
            padding: "0",
          }}
        >
          <CardContent
            sx={{
              backgroundColor: mode === "dark" ? "#131313" : "#ffffff",
              textAlign: "center",
              padding: "10px 20px",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              flexWrap="wrap"
            >
              <hr
                style={{
                  flex: 1,
                  border: 0,
                  borderTop: `1px solid ${mode === "dark" ? "#fff" : "#000"}`,
                  margin: 0,
                }}
              />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "cursive",
                  color: mode === "dark" ? "#fff" : "#000",
                }}
              >
                POPCORN
                <img
                  src={Image}
                  alt="Popcorn Movies"
                  style={{
                    marginLeft: 8,
                    marginRight: 8,
                    width: "50px",
                    height: "50px",
                  }}
                />
                MOVIES
              </span>
              <hr
                style={{
                  flex: 1,
                  border: 0,
                  borderTop: `1px solid ${mode === "dark" ? "#fff" : "#000"}`,
                  margin: 0,
                }}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ padding: "10px" }}
              flexWrap="wrap"
            >
              {socialLinks.map((link, index) => (
                <img
                  key={index}
                  onClick={() => handleRedirect(link.url)}
                  src={link.src}
                  alt={link.alt}
                  style={{ cursor: "pointer", height: "30px", width: "30px" }}
                />
              ))}
            </Stack>
          </CardContent>

          <CardActions
            sx={{
              color: mode === "dark" ? "#fff" : "#000",
              backgroundColor: mode === "dark" ? "#131313" : "#ffffff",
              textAlign: "center",
              fontSize: "12px",
              fontFamily: "cursive",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2">
              Copyright © 2024, Inc. All rights reserved.
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </footer>
  );
}

export default Footer;
