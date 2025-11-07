// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Page from "./components/Page";
import Members from "./components/Member";
import IssueBooks from "./components/IssueBook";
import ReturnBooks from "./components/ReturnBooks";

export default function App() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isMobile) setOpen(false);
  }, [isMobile]);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* Protected Routes with Layout */}
        <Route
          element={<Layout open={open} onToggle={handleToggle} isMobile={isMobile} />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/page" element={<Page />} />
          <Route path="/form" element={<Members />} />
          <Route path="/issueBooks" element={<IssueBooks />} />
          <Route path="/returnBooks" element={<ReturnBooks />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}