import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import {
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTheme } from "../themes/themeContext.jsx";
import { baseUrl } from "../basicurl/baseurl.js";
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs:'80%',md:'60%'},  
  margin: "auto",
  borderRadius: "10px",
  padding: { xs: "10px", md: "20px" }, 
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  overflowY: "auto", 
  maxHeight: "90vh", 
};

export default function EditModal({ item, onProductUpdate }) {
  const categories = [
    { value: "action & adventure", label: "action & adventure" },
    { value: "comedy", label: "comedy" },
    { value: "horror", label: "horror" },
    { value: "fantasy", label: "fantasy" },
    { value: "drama", label: "drama" },
    { value: "romance", label: "romance" },
    { value: "science fiction", label: "science fiction" },
    { value: "mystery", label: "mystery" },
    { value: "thriller", label: "thriller" },
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
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mode } = useTheme();

  const handleOpen = () => {
    setValue("title", item.title);
    setValue("language", item.language);
    setValue("category", item.category);
    setValue("description", item.description);
    setValue("duration", item.duration);
    setValue("rating", item.rating);
    setValue("iframeUrl", item.iframeUrl);
    setValue("status", item.status);
    setValue("releaseDate",new Date(item.releaseDate).toDateString());

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onSave = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("language", data.language);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    formData.append("rating", data.rating);
    formData.append("iframeUrl", data.iframeUrl);
    formData.append("status", data.status);
    formData.append("releaseDate", new Date(data.releaseDate).toISOString());
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await axios.put(
        `${baseUrl}/movies/editMovies/${item._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onProductUpdate(response.data.data);
      handleClose(); 
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Error updating product");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const textStyle = {
    borderRadius: "5px",
  };

  const typoStyle = {
    color: mode === "dark" ? "#d4cdcd" : "#3b3838",
    fontSize: "25px",
    fontWeight: "bold",
    textDecoration:
      mode === "dark"
        ? "underline 1px solid #ccc"
        : "underline 1px solid #353131",
    textAlign: "center",
      
  };

  return (
    <div>
      <IconButton
        sx={{
          position: "relative",
          left: "5px",
          color: "blue",
        }}
        onClick={handleOpen}
      >
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSave)}>
                <CloseIcon onClick={()=>handleClose()} sx={{cursor:'pointer'}}/> 
                <Typography  sx={typoStyle}>
                  Edit Movie
                </Typography>
                <Stack
                  spacing={2}
                  direction="column"
                  sx={{
                    border: "1px solid #aeb6af",
                    padding: "20px",
                    borderRadius: "10px",
                    background:
                      mode === "dark"
                        ? "linear-gradient(.25turn, #201e1e, #181a18, #161415, #181a18, #181a18)"
                        : "linear-gradient(.25turn, #f9f9f9, #f5f5f5, #e0e0e0, #f5f5f5, #f5f5f5)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton component="span"></IconButton>
                    <input
                      style={{
                        color:mode==="dark"? "#0cee32":"#090df1",
                        cursor: "pointer",
                        width: "100%",
                        fontWeight: "bold",
                        maxWidth: "50%",
                      }}
                      type="file"
                      id="image"
                      name="image"
                      variant="outlined"
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
                    <InputLabel>Category</InputLabel>
                    <Select
                      id="demo-simple-select"
                      label="Category"
                      defaultValue={item.category}
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
                    id="outlined-basic"
                    label="Duration"
                    variant="outlined"
                    {...register("duration", { required: true })}
                  />
                  {errors.duration && (
                    <span style={ErrorStyle}>Duration is required.</span>
                  )}
                  <TextField
                    sx={textStyle}
                    id="outlined-rating"
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
                  id="releaseDateTime"
                  label="Release Date "
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...register("releaseDate", { required: true })}
                />
                {errors.releaseDate && (
                  <Typography color="error">
                    Release Date is required
                  </Typography>
                )}

                  <TextField
                    id="iframeUrl"
                    label="Iframe URL"
                    type="text"
                    variant="outlined"
                    {...register("iframeUrl", { required: true })}
                  />
                  {errors.iframeUrl && (
                    <span style={ErrorStyle}>Iframe URL is required</span>
                  )}
                  <FormControl variant="outlined" sx={textStyle}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      id="demo-simple-select"
                      label="Status"
                      defaultValue={item.status}
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
                    size="small"
                    sx={{
                      mt: 2,
                      backgroundColor: "#c5133f",
                      color: "black",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      transition: "all 0.3s ease-in-out",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#c5133f",
                        color: "#bdacac",
                        fontWeight: "bold",
                        transform: "scale(1.03)",
                      },
                    }}
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Update Product"
                    )}
                  </Button>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
