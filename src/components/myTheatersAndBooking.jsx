import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../basicurl/baseurl";
import { useTheme } from "../themes/themeContext";
import { Bar, PolarArea, Bubble, Line } from "react-chartjs-2";
import { Chart, defaults } from "chart.js/auto";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import notFoundDark from "../images/notFoundDark.jpg";
import notFoundLight from "../images/59563746_9318707.jpg";
import Footer from "./footerSecnd.jsx";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.tooltip.enabled = true;

export default function MyTheatersAndBooking() {
  const [bookings, setBookings] = useState([]);
  const { mode } = useTheme();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/getBooking/ownerBookings`,
          {
            withCredentials: true,
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const chartColors =
    mode === "dark"
      ? {
          bar: {
            backgroundColor: [
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
            ],
            borderColor: "rgba(3, 45, 231, 1)",
            borderWidth: 1,
          },
          line: {
            borderColor: "rgba(231, 3, 52, 0.8)",
            backgroundColor: "rgba(231, 3, 52, 0.1)",
          },
          polarArea: {
            backgroundColor: [
              "rgba(93, 54, 235, 0.8)",
              "rgba(21, 228, 14, 0.8)",
              "rgba(231, 3, 52, 0.8)",
            ],
          },
          bubble: {
            backgroundColor: "rgba(224, 7, 47, 0.8)",
            borderColor: "#da0735",
            borderWidth: 1,
          },
        }
      : {
          bar: {
            backgroundColor: [
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
              "rgba(3, 45, 231, 0.8)",
            ],
            borderColor: "rgba(3, 45, 231, 1)",
            borderWidth: 1,
          },
          line: {
            borderColor: "rgba(231, 3, 52, 0.8)",
            backgroundColor: "rgba(231, 3, 52, 0.1)",
          },
          polarArea: {
            backgroundColor: [
              "rgba(93, 54, 235, 0.8)",
              "rgba(21, 228, 14, 0.8)",
              "rgba(231, 3, 52, 0.8)",
            ],
          },
          bubble: {
            backgroundColor: "rgba(224, 7, 47, 0.8)",
            borderColor: "#da0735",
            borderWidth: 1,
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

  const revenueByTheater = bookings.reduce((acc, booking) => {
    if (!acc[booking.theaterName]) {
      acc[booking.theaterName] = 0;
    }
    acc[booking.theaterName] += booking.amount;
    return acc;
  }, {});

  const labelss = Object.keys(revenueByTheater);
  const revenueDatas = Object.values(revenueByTheater);

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
      summary[month] = { totalTickets: 0, totalRevenue: 0, theaters: [] };
    }

    summary[month].totalTickets += booking.totalReservation;
    summary[month].totalRevenue += booking.amount;
    summary[month].theaters.push({
      name: booking.theaterName,
      revenue: booking.amount,
    });

    return summary;
  }, {});

  const monthNames = Object.keys(monthlySummary);
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

  const uniqueTheaters = new Set(
    bookings.map((booking) => booking.theaterName)
  );
  const totalUniqueTheaters = uniqueTheaters.size;

  const typostyles = {
    color: mode === "dark" ? "#aaa1a1" : "#3b3939",
    fontWeight: "bold",
    fontSize: { xs: "8px", md: "16px" },
  };

  const BoxStyle = {
    width: "100%",
    height: "70px",
    backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <>
      {bookings.length === 0 ? (
        <Box>
          <Stack spacing={1} alignItems="center" mt={5}>
            <Typography
              variant="h6"
              color={mode === "dark" ? "#e00d0d" : "#bb0e0e"}
              textAlign="center"
              fontWeight="bold"
            >
              No bookings found..!
            </Typography>
            <Typography
              variant="h6"
              color={mode === "dark" ? "#afa8a8" : "#363434"}
              textAlign="center"
              fontWeight="bold"
            >
              "If you haven't added a theater yet, please do so first..?"
            </Typography>
            <img
              src={mode === "dark" ? notFoundDark : notFoundLight}
              alt="not found"
              style={{
                maxWidth: "27%",
                height: "auto",
                borderRadius: "20px",
              }}
            />
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "90vh",
            width: "90%",
            padding: "20px",
            mb: 5,
          }}
        >
          <Stack
            direction="row"
            spacing={3}
            mt={3}
            mb={1}
            width="85%"
            justifyContent="center"
            sx={{ ml: { xs: "auto", md: 40 } }}
          >
            <Stack
              sx={{
                width: "50%",
                backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
                borderRadius: "10px",
                padding: "20px",
                color: mode === "dark" ? "#fff" : "#000",
                transition: "all 0.5s ease",

              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Line Chart at the Top */}
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  <Line
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: "Monthly Revenue",
                          data: revenueData,
                          borderColor: chartColors.line.borderColor,
                          backgroundColor: chartColors.line.backgroundColor,
                          fill: true,
                          tension: 0.3,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Monthly Ticket Sales and Revenue",
                          font: {
                            size: 20,
                            weight: "bold",
                          },
                          color: mode === "dark" ? "#fff" : "#000",
                        },
                        tooltip: {
                          backgroundColor: mode === "dark" ? "#333" : "#fff",
                          titleColor: mode === "dark" ? "#fff" : "#000",
                          bodyColor: mode === "dark" ? "#fff" : "#000",
                          borderColor: mode === "dark" ? "#666" : "#ccc",
                          borderWidth: 1,
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                    
                      scales: {
                        x: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Month",
                            font: {
                              size: 16,
                              weight: "bold",
                            },
                          },
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Revenue",
                            font: {
                              size: 16,
                              weight: "bold",
                            },
                          },
                          grid: {
                            color: mode === "dark" ? "#444" : "#ddd",
                          },
                        },
                      },
                    }}
                  />
                </Box>
              

                {/* Bar Chart at the Bottom */}
                <Box sx={{ flex: 2 }}>
                  <Bar
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          label: "Monthly Ticket Sales",
                          data: ticketSalesData,
                          backgroundColor: chartColors.bar.backgroundColor,
                          borderColor: chartColors.bar.borderColor,
                          borderWidth: chartColors.bar.borderWidth,
                          barThickness: 20,
                          borderRadius: 5,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          display: false, // Hide title for the bar chart
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return `Tickets Sold: ${context.raw}`;
                            },
                          },
                          backgroundColor: mode === "dark" ? "#333" : "#fff",
                          titleColor: mode === "dark" ? "#fff" : "#000",
                          bodyColor: mode === "dark" ? "#fff" : "#000",
                          borderColor: mode === "dark" ? "#666" : "#ccc",
                          borderWidth: 1,
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Month",
                            font: {
                              size: 16,
                              weight: "bold",
                            },
                          },
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Tickets Sold",
                            font: {
                              size: 16,
                              weight: "bold",
                            },
                          },
                          grid: {
                            color: mode === "dark" ? "#444" : "#ddd",
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Stack>

            <Stack
              sx={{
                width: "45%",
                backgroundColor: mode === "dark" ? "#1d1b1b" : "#ebeaea",
                borderRadius: "10px",
                padding: "20px",
                color: mode === "dark" ? "#fff" : "#000",
                transition: "all 0.5s ease",
              }}
            >
              <Stack direction={"column"}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Bubble
                    data={{
                      labels: labelss,
                      datasets: [
                        {
                          label: "Theater Revenue",
                          data: labelss.map((theater, index) => ({
                            x: index,
                            y: revenueDatas[index],
                            r: 5,
                            label: `${theater}: $${revenueDatas[index].toFixed(
                              2
                            )}`,
                          })),
                          backgroundColor: chartColors.bubble.backgroundColor,
                          borderColor: chartColors.bubble.borderColor,
                          borderWidth: 1,
                          hoverBackgroundColor:
                            chartColors.bubble.hoverBackgroundColor,
                          hoverBorderColor: chartColors.bubble.hoverBorderColor,
                          hoverBorderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Theater Revenue ",
                          font: {
                            size: 20,
                            weight: "bold",
                          },
                          color: mode === "dark" ? "#fff" : "#000",
                          padding: {
                            top: 10,
                            bottom: 30,
                          },
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const theater = context.label;
                              const revenue = context.raw.y;
                              return `${theater}: $${revenue.toFixed(2)}`;
                            },
                          },
                          backgroundColor: mode === "dark" ? "#333" : "#fff",
                          titleColor: mode === "dark" ? "#fff" : "#000",
                          bodyColor: mode === "dark" ? "#fff" : "#000",
                          borderColor: mode === "dark" ? "#666" : "#ccc",
                          borderWidth: 1,
                        },
                      },
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          type: "category",
                          labels: labelss,
                          beginAtZero: true,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            font: {
                              size: 12,
                            },
                          },
                        },
                        y: {
                          beginAtZero: true,

                          grid: {
                            color: mode === "dark" ? "#444" : "#ddd",
                          },
                          ticks: {
                            font: {
                              size: 12,
                            },
                          },
                        },
                      },
                    }}
                  />
                </Box>
                <hr
                  style={{
                    width: "100%",
                    height: "1px",
                    border: `1px dashed ${
                      mode === "dark" ? "#636363" : "#505050"
                    }`,
                    backgroundColor: "transparent", 
                   marginTop:'40px'
                  }}
                />

                <Box sx={{ width: "100%", height: "100%" }}>
                  <PolarArea
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
                          backgroundColor:
                            chartColors.polarArea.backgroundColor,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Payment Details",
                          
                 
                          font: {
                            size: 18,
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
            
          </Stack>

          <Stack
            direction={"row"}
            width={"90%"}
            justifyContent="center"
            spacing={2}
            sx={{ ml: { xs: "auto", md: 40 } }}
          >
           
            <Box sx={BoxStyle}>
              <Typography variant="h6" sx={typostyles}>
                Total Reservations
              </Typography>
              <Typography variant="h4" sx={typostyles}>
                {totalReservation.total}
              </Typography>
            </Box>

            <Box sx={BoxStyle}>
              <Typography variant="h6" sx={typostyles}>
                Total Bookings
              </Typography>
              <Typography variant="h4" sx={typostyles}>
                {bookings.length}
              </Typography>
            </Box>
            <Box sx={BoxStyle}>
              <Typography variant="h6" sx={typostyles}>
                Owned Theaters
              </Typography>
              <Typography variant="h4" sx={typostyles}>
                {totalUniqueTheaters}
              </Typography>
            </Box>
            <Box sx={BoxStyle}>
              <Typography variant="h6" sx={typostyles}>
                Total Revenue
              </Typography>
              <Typography variant="h4" sx={typostyles}>
                <CurrencyRupeeIcon sx={{
                  fontSize:{xs:8,md:12}
                }}/>
                {totalPayments.total}
              </Typography>
            </Box>
            <Box sx={BoxStyle}>
              <Typography variant="h6" sx={typostyles}>
              Amount Recieved
              </Typography>
              <Typography variant="h4" sx={typostyles}>
              <CurrencyRupeeIcon sx={{
                  fontSize:{xs:8,md:12}
                }}/>
              {totalPayments.paid}
              </Typography>
            </Box>
            <Box sx={BoxStyle}>
              <Typography variant="h6" sx={typostyles}>
                Amount Pending
              </Typography>
              <Typography variant="h4" sx={typostyles}>
              <CurrencyRupeeIcon sx={{
                  fontSize:{xs:8,md:12}
                }}/>
                {totalPayments.payLater}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <footer>
        <Footer />
      </footer>
    </>
  );
}
