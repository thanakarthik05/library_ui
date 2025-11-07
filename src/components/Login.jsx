// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Grid container sx={{
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  }}>
      {/* ✅ Left Side Brand Panel */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#0CA678",
          backgroundImage: "linear-gradient(145deg, #0CA678 30%, #0EA66A 100%)",
          color: "white",
          flexDirection: "column",
          textAlign: "center",
          px: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Library Management
        </Typography>
        <Typography variant="h6" maxWidth="400px">
          Manage books, track issues & returns — everything in one system.
        </Typography>
      </Grid>

      {/* ✅ Right Side Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: "#F4F7F6",
          width: "66.5%",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "90%",
            maxWidth: "420px",
            p: 5,
            borderRadius: "18px",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            mb={3}
            sx={{ color: "#0CA678" }}
          >
            Welcome Back 👋
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "10px",
              py: 1.3,
              fontSize: "16px",
              background: "#0CA678",
              textTransform: "none",
              "&:hover": { background: "#099268" },
            }}
            onClick={() => navigate("/dashboard")}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            mt={2}
            sx={{ cursor: "pointer", color: "#0CA678" }}
          >
            Forgot Password?
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
