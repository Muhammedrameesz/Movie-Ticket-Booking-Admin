import axios from "axios";
import { baseUrl } from "../basicurl/baseurl";

const verifyAdmin = async () => {
  try {
    const response = await axios.get(`${baseUrl}/admins/verifyAdmin`, {
      withCredentials: true,
    });
    if (response.status !== 200) {
      throw new Error("Failed to verify user");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default verifyAdmin;   
