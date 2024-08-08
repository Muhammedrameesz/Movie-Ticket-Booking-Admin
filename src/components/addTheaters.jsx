import React, { useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "../basicurl/baseurl";
import { useTheme } from "../themes/themeContext";
import Footer from "./footerSecnd";

const schema = yup.object().shape({
  name: yup.string().required("Theater Name is required"),
  address: yup.string().required("Address is required"),
  contact: yup.string().required("Contact Number is required"),
});

export default function AddTheaters() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const { mode } = useTheme();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/theaters/addTheater`, data, { withCredentials: true });
      if (response.status !== 200) {
        throw new Error(response.data.message || "Unexpected error");
      }
      toast.success(response.data.message);
      reset();
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add theater");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" justifyContent="center" sx={{ mt: 8, px: 2, width: "100%", mb: 10 }}>
      <Box sx={{ width: { xs: "100%", sm: "90%", md: "70%", lg: "50%" }, backgroundImage: mode === "dark" ? "url(https://img.freepik.com/premium-photo/black-color-black-background-dark-background-black-screen-black-texture-dark-texture-black-canvas_994023-330471.jpg?w=740)" : "url(https://img.freepik.com/premium-photo/green-square-background-perfect-social-media-story-banner-poster-template-all-design-works_7954-60992.jpg?w=740)", p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Typography variant="h5" align="center">Add Theaters</Typography>
          <TextField label="Theater Name" variant="outlined" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name ? errors.name.message : ""} />
          <TextField label="Address" variant="outlined" fullWidth {...register("address")} error={!!errors.address} helperText={errors.address ? errors.address.message : ""} />
          <TextField label="Contact Number" variant="outlined" fullWidth {...register("contact")} error={!!errors.contact} helperText={errors.contact ? errors.contact.message : ""} />
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: "bold", borderRadius: 2, boxShadow: 3, backgroundColor: mode === "dark" ? "green" : "#f02c2c", color: "#fff", fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.5s ease-out", "&:hover": { backgroundColor: mode === "dark" ? "green" : "#f02c2c", color: "#fff", cursor: "pointer", boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)", transform: "scale(1.03)" } }}>
              {loading ? <CircularProgress size={20} sx={{ color: "black" }} /> : "Add Theater"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
    <footer>
      <Footer />
    </footer>
    </>
  );
}
