import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import {
  MenuBook,
  People,
  AssignmentTurnedIn,
  AssignmentReturn,
  TrendingUp,
  Warning,
} from "@mui/icons-material";

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Paper
    sx={{  p: 3, minHeight: "100vh", bgcolor: "white" }}
      // sx={{
      //   maxWidth: "100%",
      //   backgroundColor: "#f9f9fb",
      //   borderRadius: isMobile ? "0" : "3px",
      //   minHeight: "89vh",
      //   margin: "10px",
      //   p: { xs: 2, sm: 3 },
      // }}
    >
      <Box sx={{ width: "100%", maxWidth: 1500, mx: "auto" }}>
  <Typography
    variant="h5"
    fontWeight="bold"
    mb={4}
    sx={{ color: "rgba(20, 168, 124, 0.9)" }}
  >
    Dashboard
  </Typography>

  {/* Stats Cards */}
  <Grid container spacing={3}>
  {[
    { title: "Total Books", value: 1200, icon: <MenuBook />, color: "#0288d1" },
    { title: "Members", value: 350, icon: <People />, color: "#7b1fa2" },
    { title: "Books Issued", value: 275, icon: <AssignmentTurnedIn />, color: "#2e7d32" },
    { title: "Overdue", value: 15, icon: <Warning />, color: "#d32f2f" },
    { title: "Returned Today", value: 38, icon: <AssignmentReturn />, color: "#f9a825" },
    { title: "Trending Genre", value: "Science", icon: <TrendingUp />, color: "#00695c" },
  ].map((stat, index) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={index < 4 ? 3 : 6} // ✅ first 4 cards: 4 per row ✅ last 2 cards: 2 per row
      key={index}
    >
      <Card
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          minWidth: 200 ,
          // sx={{ minWidth: 200 }}
          gap: 2,
          height: "120px",          // ✅ Same height for all cards
        }}
      >
        <Avatar sx={{ bgcolor: stat.color }}>{stat.icon}</Avatar>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{stat.title}</Typography>
          <Typography variant="h5" fontWeight="bold">
            {stat.value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


  {/* Section for Table/Charts later */}
  <Box mt={5}>
    <Typography variant="h6" fontWeight="600" mb={2}>
      Recent Activities
    </Typography>
    <Paper sx={{ p: 2, minHeight: "200px" }}>
      <Typography>Recent issued/returned books will appear here...</Typography>
    </Paper>
  </Box>
</Box>

    </Paper>
  );
}