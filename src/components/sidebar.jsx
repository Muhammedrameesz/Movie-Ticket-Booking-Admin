import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../themes/themeContext.jsx';
import {useMediaQuery } from '@mui/material';

const variants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

const SidebarItems = ({ mode }) => {
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
      <Link to="/admin/bookings" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          Booking Details
        </motion.li>
      </Link>
      <Link to="/owner/myTheaterAndBookings" style={{ textDecoration: 'none', color: 'inherit' }}>
        <motion.li whileHover={{ scale: 1.1 }} style={motionLinkStyles}>
          My Theater & Bookings
        </motion.li>
      </Link>
    </ul>
  );
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { mode } = useTheme();
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));


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
          <SidebarItems mode={mode} />
        </motion.nav>
      )}
      
    </div>
  );
}
