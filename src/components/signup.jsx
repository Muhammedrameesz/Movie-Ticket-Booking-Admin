import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, Box, CircularProgress } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../themes/themeContext.jsx";
import { baseUrl } from "../basicurl/baseurl";
import MovieImage from "../images/Movies.png";
import { Stack } from "@mui/system";
import AuthStore from "../authStore/authStore";
import { useState } from "react";

const styles = {
  color: "blue",
  cursor: "pointer",
  textDecoration: "underline",
  fontWeight: "bold",
  fontSize: "15px",
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(24).required(),
});

export default function Signup() {
  const { signup } = AuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { mode } = useTheme();
  const [loading, setLoading] = useState(false);

  const onSave = async (data) => {
    setLoading(true);
    try {
      const result = await axios.post(`${baseUrl}/admins/signup`, data, {
        withCredentials: true,
      });
      if (result.status == !200) {
        throw new Error(result.data.message);
      }
      await signup();
      setTimeout(() => {
        setLoading(false);
        toast.success("Successfully signed up");
        navigate("/admin/dashboard");
        reset();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: 'center',
          mt: 6,
          mb: 8,
          maxWidth: { xs: "100%", md: "80%" },

          borderRadius: "10px",
          padding: "20px",

          boxShadow:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.25) 0px 5px 5px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px"
              : "rgba(0, 0, 0, 0.25) 0px 5px 5px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          backgroundColor: mode === "light" && "#f5f2f2",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",

          color: mode === "dark" ? "white" : "black",
        }}
      >
        <Stack direction={"row"} spacing={10}>
          <img
            src={MovieImage}
            alt="movie-icon-image"
            style={{
              height: "50px",
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            className="underline"
            sx={{
              alignContent: "center",
            }}
          >
            Sign Up
          </Typography>
        </Stack>
        <Box component="form" onSubmit={handleSubmit(onSave)} sx={{ mt: 3 }}>
          <TextField
            sx={{ fontWeight: "bold" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="fname"
            autoFocus
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <p style={{ textAlign: "center" }}>
            Already have an account ?{" "}
            <Link to={"/login"} style={styles}>
              Login
            </Link>
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: 600,
              borderRadius: 10,
              backgroundColor: mode === "dark" ? "green" : "#f02c2c",
              color: mode === "dark" ? "white" : "black",
              padding: "6px 12px",
              textTransform: "uppercase",
              fontSize: 14,
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: mode === "dark" ? "#439e27" : "#f02c2c",
                color: mode === "dark" ? "white" : "black",
              },
            }}
          >
             {loading ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: mode === "dark" ? "#c7bebe" : "#1a1919",
                  }}
                />
              ) : (
                "Signup"
              )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
