import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddMovies from "./pages/addMovies.jsx";
import AdminDashboard from "./pages/adminDashBoard.jsx";
import BookingDetails from "./pages/bookingDetails.jsx";
import Hero from "./pages/hero.jsx";
import MovieDetails from "./pages/movieDetails.jsx";
import HomeLayout from "./layout/homeLayout.jsx";
import { ThemeProvider } from "./themes/themeContext.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import AdminLayout from "./layout/adminLayout.jsx";
import ProtectedRoute from "./utils/protectedRoutes.jsx";
import AddTheater from "./pages/addTheater.jsx";
import MyTheaterAndBookings from "./pages/myTheaterAndBookings.jsx";
import AdminNotifications from "./pages/notifications.jsx"
import { CancellationProvider } from "./components/contextAPI.jsx"


const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/movies/add",
        element: <AddMovies />,
      },
      {
        path: "/admin/bookings",
        element: <BookingDetails />,
      },
      {
        path: "/admin/allMovies",
        element: <MovieDetails />,
      },
      {
        path: "/owner/theaters/add",
        element: <AddTheater />,
      },
      {
        path: "/owner/myTheaterAndBookings",
        element: <MyTheaterAndBookings />,
      },
      {
        path:"/owner/notifications",
        element:<AdminNotifications/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CancellationProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={2000}
        toastStyle={{
          borderRadius: "10px",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
          width: "300px",
        }}
      />
    </ThemeProvider>
    </CancellationProvider>
  </React.StrictMode>
);
