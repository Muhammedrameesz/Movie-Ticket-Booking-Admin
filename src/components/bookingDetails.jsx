import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  Grid
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../basicurl/baseurl";
import { useTheme } from "../themes/themeContext";
import notFoundDark from "../images/notFoundDark.jpg";
import notFoundLight from "../images/59563746_9318707.jpg";
import useGetBookings from "../hooks/useGetBookings";

export default function BookingDetails() {
  const{bookings} = useGetBookings()
  const { mode } = useTheme();

 

  const headStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: mode === "dark" ? "#81ca6f" : "#278310",
    padding: "10px",
    textAlign: "center",
  };

  const bodyStyle = {
    fontSize: "12px",
    padding: "10px",
    textAlign: "center",
    color: mode === "dark" ? "#bbb2b2" : "#3a3838",
    fontWeight: "bold",
  };

  return (
    <Box sx={{ margin: "20px", display: "flex", justifyContent: "center" }}>
      {bookings.length === 0 ? (
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
        <Grid container justifyContent="center">
          <Typography sx={{
            fontSize: "20px",
            fontWeight: "bold",
            color: mode === "dark" ? "#9e6fca" : "#7430b4",
            // padding: "10px",
            textAlign: "center",
            textDecoration:"underline",
            mt:2
          }}>
            Booking Detalis
          </Typography>
          <Grid item xs={12} sm={10} md={10} sx={{
            ml:{xs:5,md:27},
            mt:3
            }} >
            <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
              <Table sx={{ fontSize: "12px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={headStyle}>User Email</TableCell>
                    <TableCell align="center" sx={headStyle}>Movie Name</TableCell>
                    <TableCell align="center" sx={headStyle}>Theater Name</TableCell>
                    <TableCell align="center" sx={headStyle}>Seat Numbers</TableCell>
                    <TableCell align="center" sx={headStyle}>Date</TableCell>
                    <TableCell align="center" sx={headStyle}>Time</TableCell>
                    <TableCell align="center" sx={headStyle}>Location</TableCell>
                    <TableCell align="center" sx={headStyle}>Payment Status</TableCell>
                    <TableCell align="center" sx={headStyle}>Amount</TableCell>
                    <TableCell align="center" sx={headStyle}>Total Reservation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell align="center" sx={bodyStyle}>{booking.userEmail}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>{booking.movieName}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>{booking.theaterName}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>
                        {booking.seetNumbers.join(", ")}
                      </TableCell>
                      <TableCell align="center" sx={bodyStyle}>
                        {new Date(booking.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center" sx={bodyStyle}>{booking.time}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>{booking.location}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>{booking.paymentStatus}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>₹{booking.amount}</TableCell>
                      <TableCell align="center" sx={bodyStyle}>{booking.totalReservation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
