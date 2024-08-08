import React from "react";
import { Card, CardContent, CardActions, Stack } from "@mui/material";
import { useTheme } from "../themes/themeContext.jsx";
import Image from "../images/Movies.png";

function Footer() {
  const { mode } = useTheme();

  const Gmail = () => {
    window.location.href = "https://mail.google.com/mail/";
  };
  const LinkedIn = () => {
    window.location.href = "https://in.linkedin.com/";
  };
  const Twitter = () => {
    window.location.href = "https://twitter.com/?lang=en";
  };
  const Insta = () => {
    window.location.href = "https://www.instagram.com/";
  };
  const Github = () => {
    window.location.href = "https://github.com/";
  };

  return (
    <footer style={{ position: "relative", marginTop: "auto" }}>
      <Card style={{ backgroundColor: mode === "dark" ? "#080808" : "#d4d4d4", padding: "0" }}>
        <CardContent
          style={{
            backgroundColor: mode === "dark" ? "#000" : "#fff",
            textAlign: "center",
            padding: "10px 20px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
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
                alt=""
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
          >
            <img
              onClick={Gmail}
              src="https://img.icons8.com/?size=48&id=ho8QlOYvMuG3&format=png"
              alt="G-mail"
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
            />
            <img
              onClick={LinkedIn}
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
              src="https://img.icons8.com/?size=48&id=13930&format=png"
              alt="LinkedIn"
            />
            <img
              onClick={Twitter}
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
              src="https://img.icons8.com/?size=48&id=ClbD5JTFM7FA&format=png"
              alt="TwitterX"
            />
            <img
              onClick={Insta}
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
              src="https://img.icons8.com/?size=48&id=32323&format=png"
              alt="Instagram"
            />
            <img
              onClick={Github}
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
              src="https://img.icons8.com/?size=48&id=AZOZNnY73haj&format=png"
              alt="GitHub"
            />
          </Stack>
        </CardContent>

        <CardActions
          style={{
            color: mode === "dark" ? "#fff" : "#000",
            backgroundColor: mode === "dark" ? "#000" : "#fff",
            textAlign: "center",
            fontSize: "12px",
            fontFamily: "cursive",
            padding: "10px 20px", // Increase padding for more height
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          Copyright © 2024 , Inc. All rights reserved.
        </CardActions>
      </Card>
    </footer>
  );
}

export default Footer;
