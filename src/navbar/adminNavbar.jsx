import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ThemeToggler from "../themes/themeToggler.jsx";
import { useTheme } from "../themes/themeContext.jsx";
import MovieImage from "../images/Movies.png";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  tooltipClasses,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import useAuthStore from "../authStore/authStore";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../basicurl/baseurl";


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function UserNavbar() {
  const { logout } = useAuthStore();
  const { mode } = useTheme();
  const textColor = mode === "dark" ? "#fff" : "#000000";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [role,setRole]=useState("")

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admins/roleCheck`, { withCredentials: true });
        if (response.status === 200) {
          console.log("Fetched Role:", response.data.data);  
          setRole(response.data.data);  
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    fetchRole();
  }, []);  

  const navLinks = [
    {
      path: "/admin/dashboard",
      value: "Home",
    },
    {
      path: "/admin/allMovies",
      value: "Movies",
    },
    {
      path: "/admin/movies/add",
      value: "Add Movies",
    },
    {
      path: "/owner/theaters/add",
      value: "Add Theaters",
    },
    {
      path: "/owner/myTheaterAndBookings",
      value: "My Theater & Bookings",
    },
      {
        path:"/owner/notifications",
        value:"Notifications"
    },
    {
      path: "/admin/bookings",
      value: "Booking Details",
    },
    {
      path:"/owners/allOwners",
      value:"Owners List"
    }
    
  ];

  const filteredNavLinks = navLinks.filter(link => {
    if (role === "owner" && (link.value === "Booking Details" || link.value === "Owners List")) {
      return false; 
    }
    return true; 
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Successfully logged out");
  };

  return (
    <div>
      <nav
        style={{
          backgroundColor: mode === "dark" ? "black" : "#eee3ec",
          color: mode === "dark" ? "#fff" : "#000",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0px 0px 10px 0px rgba(241, 235, 235, 0.75)",
        }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} sm={4} container alignItems="center">
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center",   }}
            >
              <Box
                sx={{
                  height: "50px",
                  cursor: "pointer",
                  marginLeft:{xs:3,md:2}
                }}
              >
                <img
                  src={MovieImage}
                  alt="movie-icon-image"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: "none", sm: "block" }, 
                  fontWeight: "bold",
                  marginLeft: "15px",
                  marginTop: "8px",
                  cursor: "pointer",
                  color: textColor,
                  textDecoration: "none",
                  fontSize: "20px",
                  letterSpacing: "1px",
                  textShadow:
                    mode === "light"
                      ? "2px 2px 5px rgba(0, 0, 0, 0.5)"
                      : "2px 2px 5px rgb(180, 180, 180)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Popcorn Movies
              </Typography>
            </Link>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            container
            alignItems="center"
            justifyContent="center"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Link
              to={"/admin/dashboard"}
              style={{
                textDecoration: "none",
                color: textColor,
                padding: "0 15px",
              }}
            >
              <BootstrapTooltip title="Home">
                <HomeIcon
                  sx={{
                    background: `linear-gradient(135deg, ${
                      mode === "light" ? "#10d8b7" : "#d62222"
                    } 0%, ${mode === "light" ? "#948888" : "#444141"} 100%)`,
                    color: mode === "dark" ? "#bdaeae" : "#474444",
                    padding: "4px",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    marginLeft: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: `0px 4px 8px ${
                      mode === "light"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(0, 0, 0, 0.5)"
                    }`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${
                        mode === "light" ? "#10d8b7" : "#d62222"
                      } 0%, ${mode === "light" ? "#948888" : "#444141"} 100%)`,
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </BootstrapTooltip>
            </Link>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleMenuClose}
            >
              {filteredNavLinks.map((link, index) => (
                <MenuItem key={index} onClick={handleMenuClose}>
                  <Link
                    to={link.path}
                    style={{
                      textDecoration: "none",
                      color: textColor,
                      width: "100%",
                    }}
                  >
                    {link.value}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleMenuClose}>
                <ThemeToggler />
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    backgroundColor: "#a51237",
                    fontWeight: "bold",
                    border: mode === "dark" ? "1px solid black" : "#fff",
                    textTransform: "none",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      backgroundColor: "#a51237",
                      fontWeight: "bold",
                      border: mode === "dark" ? "1px solid black" : "#fff",
                      transform: "scale(1.04)",
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </MenuItem>
            </Menu>
          </Grid>

          <Grid
            item
            xs={0}
            sm={4}
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ThemeToggler />
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                backgroundColor: "#a51237",
                fontWeight: "bold",
                border: mode === "dark" ? "1px solid black" : "#fff",
                textTransform: "none",
                marginLeft: "20px",
                transition: "all 0.5s ease",
                "&:hover": {
                  backgroundColor: "#a51237",
                  fontWeight: "bold",
                  border: mode === "dark" ? "1px solid black" : "#fff",
                  transform: "scale(1.04)",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </nav>
    </div>
  );
}
