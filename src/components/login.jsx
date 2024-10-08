import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, Box, CircularProgress,IconButton, InputAdornment  } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../themes/themeContext.jsx";
import MovieImage from "../images/Movies.png"
import { Stack } from "@mui/system";
import { baseUrl } from "../basicurl/baseurl";
import useAuthStore from "../authStore/authStore";
import { useState } from "react";

const styles = {
  color: "blue",
  cursor: "pointer",
  textDecoration: "underline",
  fontWeight: "bold",
  fontSize: "15px",
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(24).required(),
});
export default function login() {
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { mode } = useTheme();
  const [loading,setLoading]=useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSave = async (data) => {
    setLoading(true)
    try {
      const result = await axios.post(`${baseUrl}/admins/login`, 
      data,
      {
        withCredentials: true, 
      }
      );
        if(result.status ==!200){
            throw new Error(result.data.message);
        }
        await login()
        setTimeout(()=>{
          setLoading(false)
          toast.success("Successfully logged in");
          navigate('/admin/dashboard');
          reset();
        },2000)
        
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
           sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 12,
            mb:8,
            maxWidth: { xs: "100%", md: "80%" },
            border: mode === "dark" ? '1px solid #fff' : '1px solid #000',
            borderRadius: '10px',
            padding: '20px',
    
            boxShadow: mode === "dark" 
            ? 'rgba(255, 255, 255, 0.25) 0px 5px 5px, rgba(255, 255, 255, 0.12) 0px -12px 30px, rgba(255, 255, 255, 0.12) 0px 4px 6px, rgba(255, 255, 255, 0.17) 0px 12px 13px, rgba(255, 255, 255, 0.09) 0px -3px 5px' 
            : 'rgba(0, 0, 0, 0.25) 0px 5px 5px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            backgroundColor:mode==="light"&& "#f5f2f2",
            objectFit:'cover',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            backgroundPosition:'center',
         
            color:mode==="dark"?"white":"black"    
        }}
        >
          <Stack direction={'row'} spacing={10}>
           <img
              src={MovieImage}
              alt="movie-icon-image"
              style={{
                height: "50px",
              }}
            />
          <Typography component="h1" variant="h5" className="underline" sx={{
          alignContent: "center",
        }}>
            Login
          </Typography>
          </Stack>
          <Box component="form" onSubmit={handleSubmit(onSave)} sx={{ mt: 3 }}>
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
      type={showPassword ? "text" : "password"}
      id="password"
      autoComplete="current-password"
      {...register("password")}
      error={!!errors.password}
      helperText={errors.password ? errors.password.message : ""}
      sx={{
        fontWeight: "bold",
        fontSize: "1rem",
        "@media (max-width: 600px)": { fontSize: "0.9rem" },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
            <p style={{ textAlign: "center" }}>
              Don't have an account ?{" "}
              <Link to={"/signup"} style={styles}>
                Signup
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
                  backgroundColor: mode==="dark"?"green":"#f02c2c",
                  color: mode==="dark"?"white":"black",
                  padding: '6px 12px',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  cursor: 'pointer',
                  textDecoration: 'none',
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
                "Login"
              )}
             
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
