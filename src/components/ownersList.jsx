import React, { useEffect, useState, useCallback, useContext } from "react";
import { baseUrl } from "../basicurl/baseurl";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useTheme } from '../themes/themeContext.jsx'; 
import AllOwners from "./pages/allOwners.jsx"



const getStyles = (mode) => ({
  headStyle: { 
    align: 'center', 
    color: mode === "dark" ? "#9006b9" : "#3f51b5", 
    backgroundColor: mode === "dark" ? "#333" : "#e0e0e0", 
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '10px 15px',
  },
  bodyStyle: { 
    align: 'center', 
    color: mode === "dark" ? "#cacaca" : "#383838", 
    fontSize: '13px',
    padding: '10px 15px',
  },
  hoverStyle: {
    '&:hover': {
      backgroundColor: mode === "dark" ? "#444" : "#f5f5f5", 
    },
  },
  rowStyle: (i) => ({
    backgroundColor: mode === "dark" ? (i % 2 === 0 ? "#424242" : "#333") : (i % 2 === 0 ? "#fafafa" : "white"),
  }),
});

export default function OwnersList() {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);
  const { mode } = useTheme(); 

  const styles = getStyles(mode); 

  const fetchAllOwners = useCallback(async () => {
    try {
      const response = await axios.get(`${baseUrl}/admins/allOwners`);
      if (response.status === 200) {
        setOwners(response.data.data);
      }
    } catch (error) {
      setError('Failed to load owner data');
      console.error("Error fetching owners:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllOwners();
  }, [fetchAllOwners]);

  return (
    <Box ml={{xs:3,md:32}} mr={{xs:3,md:5}} mt={5} mb={3}>
      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="owners table">
          <caption style={{ captionSide: 'top', padding: '10px', fontSize: '22px', fontWeight: 'bold' ,color:'#1da710',textAlign:'left'}}>
            Owner and Theater Information
          </caption>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.headStyle}>Owner Email</TableCell>
              <TableCell sx={styles.headStyle}>Owner Id</TableCell>
              <TableCell sx={styles.headStyle}>Owner Name</TableCell>
              <TableCell sx={styles.headStyle}>Theater Name</TableCell>
              <TableCell sx={styles.headStyle}>Theater Location</TableCell>
              <TableCell sx={styles.headStyle}>Contact Number</TableCell>
              <TableCell sx={styles.headStyle}>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {owners.map((owner, i) => (
              <TableRow key={i} sx={{ ...styles.hoverStyle,  }}> 
                <TableCell sx={styles.bodyStyle}>{owner.ownerEmail}</TableCell>
                <TableCell sx={styles.bodyStyle}>{owner.ownerId}</TableCell>
                <TableCell sx={styles.bodyStyle}>{owner.ownerFirstName} {owner.ownerLastName}</TableCell>
                <TableCell sx={styles.bodyStyle}>{owner.theaterName}</TableCell>
                <TableCell sx={styles.bodyStyle}>{owner.theaterLocation}</TableCell>
                <TableCell sx={styles.bodyStyle}>{owner.theaterContact}</TableCell>
                <TableCell sx={styles.bodyStyle}>{new Date(owner.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
