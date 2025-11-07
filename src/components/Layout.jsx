// src/components/Layout.jsx
import { Box, CssBaseline, Toolbar } from "@mui/material"; // ← Add Toolbar
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 230;
const miniWidth = 70;

export default function Layout({ open, onToggle, isMobile }) {
  const width = open ? drawerWidth : miniWidth;

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Navbar */}
        <Navbar open={open} onToggle={onToggle} />

        {/* Sidebar */}
        <Sidebar open={open} isMobile={isMobile} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            // flexGrow: 1,
            bgcolor: "#f4f6f8",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {/* This Toolbar pushes content below fixed Navbar */}
          <Toolbar />

          {/* Page Content */}
          {/* <Box sx={{ p: { xs: 2, sm: 3 } }}> */}
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}