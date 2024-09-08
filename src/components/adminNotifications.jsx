import React from "react";
import { baseUrl } from "../basicurl/baseurl";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import notFound from "../images/notFoundDark.jpg";
import lNotFound from "../images/59563746_9318707.jpg";
import { useTheme } from "../themes/themeContext.jsx";
import { useCancellationContext } from "./contextAPI.jsx";
import { toast } from "react-toastify";

export default function AdminNotifications() {
  const [cancelRequest, setCancelRequest] = useState([]);
  const { mode } = useTheme();
  const { updateLength } = useCancellationContext();
  const [loadingWithId, setLoadingWithId] = useState([]);

  const getCancelRequests = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/cancel/cancellationRequestForAdmin`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCancelRequest(response.data);
        updateLength(response.data.length);
      }
    } catch (error) {
      console.log("Error fetching cancel requests:", error.message);
    }
  };

  const cinfirmCancel = async (canceledOrderId) => {
    setLoadingWithId((prev) => [...prev, canceledOrderId]);
    try {
      const response = await axios.put(`${baseUrl}/cancel/confirmCancel`, {
        canceledOrderId,
      });
      if (response.status === 200) {
        setTimeout(async () => {
          toast.success("Cancel request confirmed");
          await getCancelRequests();
          setLoadingWithId((prev) =>
            prev.filter((id) => id !== canceledOrderId)
          );
        }, 2500);
      }
    } catch (error) {
      setTimeout(() => {
        console.error(error);
        toast.error(error?.response?.data?.message || "An error occurred");
        setLoadingWithId((prev) => prev.filter((id) => id !== canceledOrderId));
      }, 2500);
    }
  };

  useEffect(() => {
    getCancelRequests();
    const intervalId = setInterval(() => {
      getCancelRequests();
    }, 30000);

    return () => {
      console.log("Cleaning up polling");
      clearInterval(intervalId);
    };
  }, []);

  const typoStyle = {
    fontSize: "14px",
    color: mode === "dark" ? "#ececec" : "#181818",
  };

  return (
    <>
      <Box
        sx={{
          color: "#cfcfcf",
          p: 2,
          ml: { xs: 1, sm: 2, md: 30, lg: 33 },
        }}
      >
        {cancelRequest.length === 0 ? (
          <>
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#b81111",
                  fontWeight: "bold",
                  fontSize: { xs: "16px", md: "20px" },
                }}
              >
                No cancelation request found
              </Typography>{" "}
              <br />
              <img
                src={mode === "dark" ? notFound : lNotFound}
                alt="notfound"
                style={{
                  maxWidth: "30%",
                  height: "auto",
                  borderRadius: "20px",
                }}
              />
            </Stack>
          </>
        ) : (
          <>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 4,
                fontWeight: "bold",
                color: "#8d65cc",
                textDecoration: "underline",
                fontSize: { xs: "1.2rem", md: "1.8rem" },
              }}
            >
              Booking Cancelation Requests
            </Typography>

            <Grid container spacing={5}>
              {cancelRequest.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Box
                    sx={{
                      p: 2,
                      // backgroundColor: "#030303", // Dark gray background for contrast
                      borderRadius: 2,
                      boxShadow:
                        mode === "dark"
                          ? "0px 4px 12px rgba(0, 0, 0, 0.3)"
                          : "0px 4px 12px rgba(0, 0, 0, 0.3)",
                      transition: "transform 0.3s ease",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <Stack
                      spacing={1.5}
                      sx={{
                        // border: "1px solid #1a1a1a",
                        padding: "15px",
                        backgroundColor:
                          mode === "dark" ? "#1d1d1d" : "#dbdbdb",
                        borderRadius: "10px",
                      }}
                    >
                      <Stack>
                        <Typography sx={{ fontSize: "14px", color: "#1820bd" }}>
                          <strong>User ID:</strong> {item.userId}
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "#1820bd" }}>
                          <strong>Order ID:</strong> {item.orderId}
                        </Typography>
                      </Stack>
                      <Typography sx={typoStyle}>
                        <strong>Movie Name:</strong> {item.movieName}
                      </Typography>

                      <Typography sx={typoStyle}>
                        <strong>Seat Numbers:</strong> {item.seetNumbers}
                      </Typography>
                      <Typography sx={typoStyle}>
                        <strong>Theater Name:</strong> {item.theaterName}
                      </Typography>
                      <Typography sx={typoStyle}>
                        <strong>Total Reservation:</strong>{" "}
                        {item.totalResurvation}
                      </Typography>
                      <Typography sx={typoStyle}>
                        <strong>Date:</strong>{" "}
                        {new Date(item.date).toLocaleDateString()}
                      </Typography>
                      <Typography sx={typoStyle}>
                        <strong>Time:</strong> {item.time}
                      </Typography>
                      <Typography sx={typoStyle}>
                        <strong>Amount:</strong> {item.amout}
                      </Typography>

                      {loadingWithId.includes(item._id) ? (
                        <Box
                          sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                          }}
                        >
                          <CircularProgress
                            size={18}
                            sx={{
                              color: mode === "dark" ? "#0caa0c" : "#630caa",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)", 
                            }}
                          />
                        </Box>
                      ) : (
                        <Button
                          onClick={() => cinfirmCancel(item._id)} 
                          disabled={item.status === "Cancellation confirmed"}
                          variant="contained"
                          color="primary"
                          sx={{
                            mt: 2,
                            backgroundColor:
                              mode === "dark" ? "#0caa0c" : "#630caa",
                            fontWeight: "bold",
                            "&:hover": {
                              backgroundColor:
                                mode === "dark" ? "#0caa0c" : "#630caa", 
                            },
                            
                          }}
                        >
                          {item.status === "Cancel Requested"
                            ? "Confirm Cancellation"
                            : "This booking was canceled"}
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
