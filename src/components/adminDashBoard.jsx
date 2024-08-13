import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../themes/themeContext";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, defaults } from "chart.js/auto";
import useGetBookings from "../hooks/useGetBookings";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Footer from "./footerSecnd.jsx"

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.tooltip.enabled = true;

export default function AdminDashBoard() {
  const { mode } = useTheme();
  const { bookings, error } = useGetBookings();


  const chartColors =
    mode === "dark"
      ? {
          line: {
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(245, 149, 6, 0.8)"],
          },
          bar: {
            backgroundColor: [
              "rgba(231, 3, 52, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(86, 255, 114, 0.8)",
              "rgba(83, 75, 192, 0.8)",
              "rgba(250, 193, 19, 0.8)",
              "rgba(255, 64, 198, 0.8)",
            ],
          },
          doughnut: {
            backgroundColor: [
              "rgba(93, 54, 235, 0.8)",
              "rgba(21, 228, 14, 0.8)",
              "rgba(231, 3, 52, 0.8)",
            ],
          },
        }
      : {
          line: {
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: ["#04054e", "rgba(184, 9, 18, 0.8)"],
          },
          bar: {
            backgroundColor: [
              "rgba(231, 3, 52, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(86, 255, 114, 0.8)",
              "rgba(83, 75, 192, 0.8)",
              "rgba(250, 193, 19, 0.8)",
              "rgba(255, 64, 198, 0.8)",
            ],
          },
          doughnut: {
            backgroundColor: [
              "rgba(93, 54, 235, 0.8)",
              "rgba(21, 228, 14, 0.8)",
              "rgba(231, 3, 52, 0.8)",
            ],
          },
        };
  const totalPayments = bookings.reduce(
    (totals, booking) => {
      if (booking.paymentStatus === "payLater") {
        totals.payLater += booking.amount;
      } else if (booking.paymentStatus === "paid") {
        totals.paid += booking.amount;
      }
      totals.total += booking.amount;
      return totals;
    },
    { payLater: 0, paid: 0, total: 0 }
  );

  const totalReservation = bookings.reduce(
    (totals, booking) => {
      totals.total += booking.totalReservation;
      return totals;
    },
    { total: 0 }
  );

  const monthlySummary = bookings.reduce((summary, booking) => {
    const date = new Date(booking.date);
    const month = date.toLocaleString("default", { month: "long" });

    if (!summary[month]) {
      summary[month] = { totalTickets: 0, totalRevenue: 0 };
    }

    summary[month].totalTickets += booking.totalReservation;
    summary[month].totalRevenue += booking.amount;

    return summary;
  }, {});

  // Create arrays for labels, ticket sales, and revenue
  const monthNames = Object.keys(monthlySummary); // Get only the months with data

  // Ensure the months are sorted in chronological order
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const labels = monthOrder.filter((month) => monthNames.includes(month));
  const ticketSalesData = labels.map(
    (month) => monthlySummary[month]?.totalTickets || 0
  );
  const revenueData = labels.map(
    (month) => monthlySummary[month]?.totalRevenue || 0
  );

  // Get unique theaters
  const uniqueTheaters = new Set(
    bookings.map((booking) => booking.theaterName)
  );
  const totalUniqueTheaters = uniqueTheaters.size;

  const typostyles = {
    color: mode === "dark" ? "#aaa1a1" : "#3b3939",
    fontWeight: "bold",
    fontSize: {xs:'16px',md:'16px'},
  };

  const BoxStyle = {
    width: "100%",
    height: { xs: "80px", sm: "90px" },
    backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: { xs: "8px", sm: "10px" },
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
          width: "90%",
          padding: "10px",
          mt:3,
        }}
      > 
        <Stack
           direction={{ xs: "column", sm: "row" }}
          width={"100%"}
          justifyContent="center"
          spacing={3}
           sx={{  ml: { xs:6, md: 35 }}}
          
        >
          {/* first */}
          <Stack
            direction={"column"}
            width={{ xs: "100%", sm: "15%" }}
            spacing={1}
            alignItems="center"
           
          >
            <Box sx={BoxStyle}>
              <Typography
               
                sx={typostyles}
              >
                Total Revenue
              </Typography>
              <Typography  sx={typostyles}>
                <CurrencyRupeeIcon />
                {totalPayments.total}
              </Typography>
            </Box>
            <Box sx={BoxStyle}>
              <Typography  sx={typostyles}>
                Total Reservations
              </Typography>
              <Typography  sx={typostyles}>
                {totalReservation.total}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={"column"}
            width={{ xs: "100%", sm: "15%" }}
            spacing={1}
            alignItems="center"
          >
            <Box sx={BoxStyle}>
              <Typography  sx={typostyles}>
                Total Bookings
              </Typography>
              <Typography  sx={typostyles}>
                {bookings.length}
              </Typography>
            </Box>
            <Box sx={BoxStyle}>
              <Typography  sx={typostyles}>
                Total Theaters
              </Typography>
              <Typography  sx={typostyles}>
                {totalUniqueTheaters}
              </Typography>
            </Box>
          </Stack>


          <Box
            sx={{
              height: { xs: "30vh", sm: "35vh" },
              width: { xs: "100%", sm: "40%" },
              backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
              borderRadius: "10px",
              padding: "20px",
              color: mode === "dark" ? "#fff" : "#000",
              transition: "all 0.5s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "100%" }}>
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Tickets Sold",
                      data: ticketSalesData,
                      backgroundColor: chartColors.line.backgroundColor,
                      borderColor: chartColors.line.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                    },
                    {
                      label: "Revenue",
                      data: revenueData,
                      backgroundColor: chartColors.line.backgroundColor,
                      borderColor: chartColors.line.borderColor,
                      borderWidth: 1,
                      borderRadius: 5,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.5,
                    },
                  },
                  plugins: {
                    title: {
                      display: true,
                      text: "Ticket Sales and Revenue",
                      font: {
                        size: 20,
                      },
                      color: mode === "dark" ? "#fff" : "#000", 
                    },
                  },
                }}
              />
            </Box>
          </Box>

          
        </Stack>

        <Stack
      direction={{ xs: "column", md: "row" }} 
      spacing={3}
      mt={3}
      mb={10}
      width="100%"
      justifyContent="center"
      sx={{ overflowX: "auto",ml: { xs:6, md: 35 } }} 
      
    >
      <Stack
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", md: "40%" },
          backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
          borderRadius: "10px",
          padding: "20px",
          color: mode === "dark" ? "#fff" : "#000",
          transition: "all 0.5s ease",
          height: { xs: "30vh", md: "37vh" }, // Responsive height
        }}
      >
       
        <Box sx={{ width: "100%", height: "100%" }}>
          <Bar
            data={{
              labels,
              datasets: [
                {
                  label: "Tickets Sold",
                  data: ticketSalesData,
                  backgroundColor: chartColors.bar.backgroundColor,
                  borderWidth: 0,
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Monthly Tickets Sold",
                  font: {
                    size: 20,
                  },
                  color: mode === "dark" ? "#fff" : "#000",
                },
              },
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                  },
                },
              },
            }}
          />
        </Box>
      </Stack>
      <Stack
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", md: "40%" },
          backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
          borderRadius: "10px",
          padding: "20px",
          color: mode === "dark" ? "#fff" : "#000",
          transition: "all 0.5s ease",
          height: { xs: "30vh", md: "37vh" }, // Responsive height
        }}
      >
      
        <Box sx={{ width: "100%", height: "100%" }}>
          <Doughnut
            data={{
              labels: ["Total", "Paid", "Pay Later"],
              datasets: [
                {
                  label: "Payment Details",
                  data: [
                    totalPayments.total,
                    totalPayments.paid,
                    totalPayments.payLater,
                  ],
                  backgroundColor: chartColors.doughnut.backgroundColor,
                  borderWidth: 0,
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Payment Details",
                  font: {
                    size: 20,
                  },
                  color: mode === "dark" ? "#fff" : "#000",
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </Box>
      </Stack>
    </Stack>


      </Box>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}
