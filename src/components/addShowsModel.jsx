import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { baseUrl } from "../basicurl/baseurl";
import {
  Stack,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  movieName: yup.string().required("Movie Name is required"),
  theaterName: yup.string().required("Theater Name is required"),
  dateTime: yup.string().required("Date and Time is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
});

const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 4,
  borderRadius: 5,
};

export default function KeepMountedModal({ movie }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setValue("movieName", movie.title);
    setOpen(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(`${baseUrl}/theaters/getTheaters`, {
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        setTheaters(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch theaters");
      }
    };
    fetchTheaters();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${baseUrl}/shows/addShows`, data);
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        reset();
        handleClose();
      } catch (error) {
        console.error(error);
        toast.error("Failed to add theater");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          backgroundColor: "#6a1caa",
          color: "#f5eeee",
          fontWeight: "bold",
          borderRadius: "5px",
          transition: "500ms",
          border: "#6a1caa",
          fontSize: '10px',
          padding: "5px",
          "&:hover": {
            backgroundColor: "#6a1caa",
            border: "#6a1caa",
            transform: "scale(1.04)",
          },
        }}
      >
        Add Shows
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          justifyContent="center"
          sx={style}
        >
          <Stack direction={"column"} maxWidth={500} width="100%" spacing={2}>
            <Typography variant="h5" align="center">
              Add Shows
            </Typography>
            <TextField
              label="Movie Name"
              variant="outlined"
              fullWidth
              {...register("movieName")}
              error={!!errors.movieName}
              helperText={errors.movieName ? errors.movieName.message : ""}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth variant="outlined" error={!!errors.theaterName}>
              <InputLabel id="theater-label">Theater Name</InputLabel>
              <Select
                labelId="theater-label"
                label="Theater Name"
                defaultValue=""
                {...register("theaterName")}
              >
                <MenuItem value="" disabled>
                  Select Theater
                </MenuItem>
                {theaters.map((theater, index) => (
                  <MenuItem key={index} value={theater.name}>
                    {theater.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.theaterName && (
                <Typography color="error">
                  {errors.theaterName.message}
                </Typography>
              )}
            </FormControl>
            <TextField
              type="datetime-local"
              variant="outlined"
              fullWidth
              {...register("dateTime")}
              error={!!errors.dateTime}
              helperText={errors.dateTime ? errors.dateTime.message : ""}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="number"
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""}
              InputLabelProps={{ shrink: true }}
            />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "black" }} />
                ) : (
                  "Add Shows"
                )}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
