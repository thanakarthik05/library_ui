// src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { drawerWidth, miniWidth } from "./Sidebar";

export default function Navbar({ open, onToggle }) {
  const width = open ? drawerWidth : miniWidth;

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        // left: `${width}px`,                       // <-- make AppBar start after drawer
        // width: `calc(100% - ${width}px)`,         // <-- width equals remaining space
        zIndex: (t) => t.zIndex.drawer + 1,
        bgcolor: "white",
        color: "#1a1e1c",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        // transition: "left 0.3s ease, width 0.3s ease",
      }}
    >
      <Toolbar sx={{ pr: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}>
          <IconButton color="inherit" onClick={onToggle} edge="start" aria-label="menu">
            <MenuIcon sx={{ color: "#1b1e1d" }} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            Library Management System
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Badge badgeContent={4} color="secondary"><MailIcon sx={{ color: "#1b1e1d" }} /></Badge>
          <Badge badgeContent={4} color="error"><NotificationsIcon sx={{ color: "#1b1e1d" }} /></Badge>
          <Avatar alt="Profile" src="https://i.pravatar.cc/300" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
