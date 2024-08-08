import ProductHook from "../hooks/useMoveiHook";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Grid,
  IconButton,
  CircularProgress,
  Box,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import EditModal from "./editModel.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { baseUrl } from "../basicurl/baseurl.js";
import { useTheme } from "../themes/themeContext.jsx";
import Modal from "@mui/material/Modal";
import { format } from "date-fns";
import AddShowModal from "./addShowsModel.jsx";
import notFoundDark from "../images/notFoundDark.jpg";
import notFoundLight from "../images/59563746_9318707.jpg";
import SearchBar from "../../ui/searchBar.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300, // Reduced width
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3, // Reduced padding
  borderRadius: 2,
};

export default function CustomizedTables() {
  const { movies, setMovies } = ProductHook();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { mode } = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState("");

  const handleOpen = (id) => {
    setSelectedMovieId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    setLoadingProductId(id);
    setTimeout(async () => {
      try {
        const response = await axios.delete(
          `${baseUrl}/movies/deleteMovies/${id}`
        );
        setMovies(movies.filter((item) => item._id !== id));
        toast.success(response.data.message || "Movie deleted successfully");
        handleClose();
      } catch (error) {
        toast.error("Error deleting movie");
      } finally {
        setLoadingProductId(null);
      }
    }, 1000);
  };

  const handleProductUpdate = async (updatedProduct) => {
    setMovies((previosProducts) =>
      previosProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "bold",
      fontSize: "0.9rem", // Reduced font size for headers
      color: mode === "dark" ? "#14bdf1" : "#07546b",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "0.8rem", // Reduced font size for body
      fontFamily: "Helvetica",
      fontWeight: "medium",
      color: mode === "dark" ? "#cfc9c9" : "#4b4848",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const filteredData = movies.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2} // Adjusted spacing
      sx={{
        marginTop: { xs: "2px", md: "5px" },
       
      }}
    >
      <Grid item xs={12} md={10} lg={10} sx={{ ml: { xs: 1, md: 30 } }}>
        <SearchBar setQuery={setQuery} />
      </Grid>
      <Grid
        item
        xs={12}
        md={10}
        lg={10}
        sx={{
          ml: { xs: 1, md: 30 },
          mb: { xs: 2, md: 5 },
        }}
      >
        {movies.length === 0 ? (
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h6"
              color={mode === "dark" ? "#f82323" : "#bb0e0e"}
              textAlign="center"
              fontWeight="bold"
            >
              There is a  delay in loading the data....!
            </Typography>
            <img
              src={mode === "dark" ? notFoundDark : notFoundLight}
              alt="not found"
              style={{
                maxWidth: "30%",
                height: "auto",
                borderRadius: "20px",
              }}
            />
          </Stack>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "98%", overflowX: "auto" }}
          >
            <Table aria-label="customized table">
              <TableHead
                sx={{
                  backgroundColor: mode === "dark" ? "#1d1d1d" : "#b9b9b9",
                }}
              >
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell align="right">Title</StyledTableCell>
                  <StyledTableCell align="right">Language</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Duration</StyledTableCell>
                  <StyledTableCell align="right">Release Date</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                  <StyledTableCell align="right">Add Shows</StyledTableCell>
                </TableRow>
              </TableHead>
              {query ? (
                <TableBody>
                  {filteredData.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell component="th" scope="row">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            height: "40px", // Reduced height
                            width: "40px", // Reduced width
                            borderRadius: "8px", // Reduced border radius
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.language}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.category}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.duration}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.date
                          ? !isNaN(new Date(item.date).getTime())
                            ? format(new Date(item.date), "MMM dd, yyyy")
                            : "Invalid Date"
                          : "Invalid Date"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <EditModal
                          item={item}
                          onProductUpdate={handleProductUpdate}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton onClick={() => handleOpen(item._id)}>
                          <DeleteIcon
                            sx={{ color: "#c92c2c", fontSize: "1.2rem" }}
                          />
                          {/* Reduced icon size */}
                        </IconButton>
                        <Modal
                          open={open && selectedMovieId === item._id}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              Are you sure you want to delete this movie?
                            </Typography>
                            <Grid
                              container
                              justifyContent="center"
                              spacing={1}
                              sx={{ marginTop: 2 }}
                            >
                              <Grid item>
                                <Button
                                  onClick={handleClose}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#094781",
                                    "&:hover": { backgroundColor: "#06325e" },
                                    fontWeight: "bold",
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  onClick={() => handleDelete(item._id)}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#c92c2c",
                                    "&:hover": { backgroundColor: "red" },
                                    fontWeight: "bold",
                                  }}
                                >
                                  {loadingProductId === item._id ? (
                                    <CircularProgress
                                      size={24}
                                      color="inherit"
                                    />
                                  ) : (
                                    "Delete"
                                  )}
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <AddShowModal movie={item} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {movies.map((item) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell component="th" scope="row">
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            height: "40px", // Reduced height
                            width: "40px", // Reduced width
                            borderRadius: "8px", // Reduced border radius
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.language}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.category}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.duration}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.date
                          ? !isNaN(new Date(item.date).getTime())
                            ? format(new Date(item.date), "MMM dd, yyyy")
                            : "Invalid Date"
                          : "Invalid Date"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <EditModal
                          item={item}
                          onProductUpdate={handleProductUpdate}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton onClick={() => handleOpen(item._id)}>
                          <DeleteIcon
                            sx={{ color: "#c92c2c", fontSize: "1.2rem" }}
                          />
                          {/* Reduced icon size */}
                        </IconButton>
                        <Modal
                          open={open && selectedMovieId === item._id}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              Are you sure you want to delete this movie?
                            </Typography>
                            <Grid
                              container
                              justifyContent="center"
                              spacing={1}
                              sx={{ marginTop: 2 }}
                            >
                              <Grid item>
                                <Button
                                  onClick={handleClose}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#094781",
                                    "&:hover": { backgroundColor: "#06325e" },
                                    fontWeight: "bold",
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  onClick={() => handleDelete(item._id)}
                                  variant="contained"
                                  sx={{
                                    backgroundColor: "#c92c2c",
                                    "&:hover": { backgroundColor: "red" },
                                    fontWeight: "bold",
                                  }}
                                >
                                  {loadingProductId === item._id ? (
                                    <CircularProgress
                                      size={24}
                                      color="inherit"
                                    />
                                  ) : (
                                    "Delete"
                                  )}
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <AddShowModal movie={item} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}
