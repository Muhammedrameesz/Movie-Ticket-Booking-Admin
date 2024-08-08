import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../themes/themeContext.jsx";
import Footer from "./footerSecnd.jsx";

export default function SampleApiHandler() {
  const categories = [
    { value: "action & adventure", label: "action & adventure" },
    { value: "comedy", label: "comedy" },
    { value: "horror", label: "horror" },
    { value: "fantasy", label: "fantasy" },
    { value: "adventure & drama", label: "adventure & drama" },
    { value: "romance", label: "romance" },
    { value: "science fiction", label: "science fiction" },
    { value: "mystery", label: "mystery" },
    { value: "action & thriller", label: "action & thriller" },
    { value: "sports", label: "sports" },
    { value: "musical", label: "musical" },
  ];

  const status = [
    { value: "Now Showing", label: "Now Showing" },
    { value: "Trending", label: "Trending" },
    { value: "Up Coming", label: "Up Coming" },
  ];

  const ErrorStyle = {
    color: "#df2222",
    fontSize: "14px",
    marginTop: "5px",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mode } = useTheme();

  const onSave = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("language", data.language);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append("releaseDate", new Date(data.releaseDate).toISOString());
    formData.append("image", data.image[0]); // Handle image file
    formData.append("iframeUrl", data.iframeUrl);
    formData.append("rating", data.rating);
    formData.append("duration", data.duration);

    try {
      const result = await axios.post(
        "http://localhost:7500/movies/addMovies",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = result.data;
      console.log("result:", responseData);
      toast.success("Movie added successfully");
      reset();
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const textStyle = {
    borderRadius: "5px",
  };

  const typoStyle = {
    color: mode === "dark" ? "#d4cdcd" : "#3b3838",
    fontSize: "30px",
    fontWeight: "bold",
    margin: "2%",
    textDecoration:
      mode === "dark"
        ? "underline 1px solid #ccc"
        : "underline 1px solid #353131",
    textAlign: "center",
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "75%",
          margin: "auto",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Grid container spacing={3} sx={{ ml: { xs: 1, md: 10 } }}>
          <Grid item xs={12}>
            {isLoading && (
              <Backdrop
                sx={{
                  color: "#faf5f5",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                open={isLoading}
              >
                <CircularProgress color="inherit" />
                <div className="loading-text">Processing....</div>
              </Backdrop>
            )}
            <form onSubmit={handleSubmit(onSave)}>
              <Typography variant="h4" sx={typoStyle}>
                Add Movies
              </Typography>
              <Stack
                spacing={2}
                direction="column"
                sx={{
                  border: "1px solid #aeb6af",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{
                      color: mode === "dark" ? "#0cee32" : "#090df1",
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: "bold",
                      maxWidth: "50%",
                    }}
                    type="file"
                    id="image"
                    name="image"
                    {...register("image", { required: true })}
                  />
                </div>
                {errors.image && (
                  <span style={ErrorStyle}>Please select an image.</span>
                )}
                <TextField
                  sx={textStyle}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span style={ErrorStyle}>Title is required.</span>
                )}
                <TextField
                  sx={textStyle}
                  id="outlined-basic"
                  label="Language"
                  variant="outlined"
                  {...register("language", { required: true })}
                />
                {errors.language && (
                  <span style={ErrorStyle}>Language is required.</span>
                )}
                <FormControl variant="outlined" sx={textStyle}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    id="category-select"
                    label="Category"
                    defaultValue=""
                    {...register("category", { required: true })}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.category && (
                  <span style={ErrorStyle}>Please select a category.</span>
                )}
                <TextField
                  sx={{
                    ...textStyle,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "5px",
                    },
                    height: "auto",
                    textarea: {
                      overflow: "auto",
                    },
                  }}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span style={ErrorStyle}>Description is required.</span>
                )}
                <TextField
                  sx={textStyle}
                  id="outlined-duration"
                  label="Duration"
                  variant="outlined"
                  {...register("duration", { required: true })}
                />
                {errors.duration && (
                  <span style={ErrorStyle}>Duration is required.</span>
                )}
                <TextField
                  id="rating"
                  label="Rating"
                  variant="outlined"
                  type="number"
                  inputProps={{ min: 1, max: 10, step: 0.1 }}
                  {...register("rating", {
                    required: "Rating is required",
                    min: {
                      value: 1,
                      message: "Rating must be at least 1",
                    },
                    max: {
                      value: 10,
                      message: "Rating must be at most 10",
                    },
                    validate: (value) => {
                      if (value >= 1 && value <= 10) {
                        return true;
                      }
                      return "Rating must be between 1 and 10";
                    },
                  })}
                />
                {errors.rating && (
                  <span style={ErrorStyle}>{errors.rating.message}</span>
                )}
                <TextField
                  sx={textStyle}
                  id="outlined-basic"
                  label="Iframe URL"
                  variant="outlined"
                  {...register("iframeUrl")}
                />
                <TextField
                  sx={textStyle}
                  id="release-date"
                  label="Release Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("releaseDate", { required: true })}
                />
                {errors.releaseDate && (
                  <span style={ErrorStyle}>Release Date is required.</span>
                )}
                <FormControl variant="outlined" sx={textStyle}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    id="status-select"
                    label="Status"
                    defaultValue=""
                    {...register("status", { required: true })}
                  >
                    {status.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.status && (
                  <span style={ErrorStyle}>Please select a status.</span>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: mode === "dark" ? "#1976d2" : "#3f51b5",
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
