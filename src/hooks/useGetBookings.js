import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../basicurl/baseurl";

export default function useGetBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getBooking/allBookings`);
        if (response.status === 200) {
          setBookings(response.data.bookings)
        } else {
          console.error("Failed to fetch bookings");
          setError("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      }
    };
    fetchBookings();
  }, []);

  return { bookings, error };
}
