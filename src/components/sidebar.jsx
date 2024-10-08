import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../themes/themeContext.jsx';
import {Badge, useMediaQuery } from '@mui/material';
import { useCancellationContext } from "./contextAPI.jsx"
import axios from 'axios';
import { baseUrl } from '../basicurl/baseurl';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';


const variants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};


const SidebarItems = ({ mode ,length ,role}) => {
  const motionLinkStyles = {
    padding: '10px',
    backgroundColor: mode === 'dark' ? '#292727' : '#f5f5f5',
    color: mode === 'dark' ? '#f1f1f1' : '#000',
    margin: '5px 0',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Dash Board
        </motion.li>
      </Link>
      <Link to="/admin/allMovies" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Movies
        </motion.li>
      </Link>
      <Link to="/admin/movies/add" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Add Movies
        </motion.li>
      </Link>
      <Link to="/owner/theaters/add" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Add Theater
        </motion.li>
      </Link>
      
      <Link to="/owner/myTheaterAndBookings" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          My Theater & Bookings
        </motion.li>
      </Link>
      <Link to="/owner/notifications" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          <Badge 
          badgeContent={length} 
          color="secondary"  
          anchorOrigin={{
            vertical: 'top',
              horizontal: 'left',
          }}>
          <NotificationsNoneOutlinedIcon sx={{fontSize:'20px',mr:1}}/>
          </Badge>
          Notifications
        </motion.li>
      </Link>
      <Link to="/admin/bookings" style={{ textDecoration: 'none', color: 'inherit',display:role==="admin"?'block':'none' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Booking Details
        </motion.li>
      </Link>
      <Link to="/owners/allOwners" style={{ textDecoration: 'none', color: 'inherit',display:role==="admin"?'block':'none' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Owners List
        </motion.li>
      </Link>
    </ul>
  );
};
// /owners/allOwners
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { mode } = useTheme();
  const [role,setRole]=useState("")
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { length } = useCancellationContext();

  useEffect(()=>{
    const fetchRole = async()=>{
      try {
        const response = await axios.get(`${baseUrl}/admins/roleCheck`,{withCredentials:true})
        if(response.status===200){
          setRole(response.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchRole()
  },[])

  return (
    <div>
      {!isSmallScreen && (
        <motion.nav
          animate={isOpen ? 'open' : 'closed'}
          variants={variants}
          initial='open'
          style={{
            height: '100vh',
            width: '220px',
            backgroundColor: mode === 'dark' ? '#1b1b1d' : '#dce2e2',
            padding: '20px',
            boxShadow: '2px 0px 5px rgba(1, 1, 26, 0.1)',
            borderRadius: '1px',
            position: 'fixed',
            top: 100,
            left: 0,
            zIndex: 9,
          }}
        >
          <SidebarItems mode={mode} length ={length } role={role}/>
        </motion.nav>
      )}
      
    </div>
  );
}
