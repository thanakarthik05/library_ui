import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import LogoutIcon from "@mui/icons-material/Logout";

export const drawerWidth = 230;
export const miniWidth = 70;

export default function Sidebar({ open = true }) {
  const width = open ? drawerWidth : miniWidth;
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Books", icon: <MenuBookIcon />, path: "/page" },
    { text: "Members", icon: <GroupsIcon />, path: "/form" },
    { text: "Issue Books", icon: <AssignmentTurnedInIcon />, path: "/issueBooks" },
    { text: "Return Books", icon: <AssignmentReturnedIcon />, path: "/returnBooks" },
    { text: "Log Out", icon: <LogoutIcon />, path: "/" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #14A87C, #0A6A5A)",
          color: "white",
          transition: "width 0.3s ease",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ mt: 1 }}>
        <List>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    bgcolor: active ? "rgba(255, 255, 255, 0.25)" : "transparent",
                    borderLeft: active ? "4px solid #fff" : "4px solid transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
