// src/components/Page.jsx
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Container,
  useTheme, useMediaQuery 
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CLASSES = ["Class A", "Class B", "Class C", "Class D"];
const SUBJECTS = ["Tamil", "English", "Maths", "Science", "Social"];
const initialData ={
  "bookName":"",
  "author":"",
  "publisher":"",
  "yearOfPublication":"",
  "numberOfCopies":"",
  "availableCopies":"",
}

export default function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(initialData);
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  // const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, studentClass, subject } = form;
    if (!name || !studentClass || !subject) {
      alert("Please fill all fields!");
      return;
    }

    if (editId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...form } : s))
      );
      setEditId(null);
    } else {
      setStudents((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setForm({ name: "", studentClass: "", subject: "" });
  };

  const handleEdit = (id) => {
    const student = students.find((s) => s.id === id);
    setForm({
      name: student.name,
      studentClass: student.studentClass,
      subject: student.subject,
    });
    setEditId(id);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    // Use Container for responsive max-width and auto margins
   
      <Paper
            sx={{
              maxWidth: "100%",
              backgroundColor: "white",
              // padding: "20px",
              borderRadius: isMobile ? "0" : "3px",
              minHeight: "530px",
              marginTop: "10px",
              marginLeft: isMobile ? "3px" : "10px",
              marginRight: isMobile ? "3px" : "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Box
                   elevation={3}
                  //  sx={{ p: { xs: 3, sm: 4 },backgroundColor: "#f5f5f5", borderRadius: 2, width: "100%", maxWidth: 1500 }}
                  sx={{ p: { xs: 3, sm: 4 },width: "100%", maxWidth: 1500 }}
                   >
        <Typography variant="h5" fontWeight="bold" mb={3} sx={{color: "rgba(20, 168, 124, 0.9)",}}>
          Add Books
        </Typography>
        <Grid
        container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
        >
          {[
            {
                label: "Book Name",
                value: "",
                key: "bookName",
            },
            {
                label: "Author",
                value: "",
                key: "author",
            },
            {
                label: "publisher",
                value: "",
                key: "Publisher",
            },
            {
                label: "Year Of Publication",
                value: "",
                key: "yearOfPublication",
            },
            {
                label: "Number Of Copies",
                value: "",
                key: "numberOfCopies",
            },
            {
                label: "availableCopies",
                value: "",
                key: "Available Copies",
            },
          ].map((field)=>(
            <Grid
            item
            xs={12}
            sm={6}
            md={field.md || 11}
            key={field.key}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px' // Add padding for better spacing
            }}
            >
              <TextField
              id="bookName"
              label={field.label}
              fullWidth
              size="large"
              value={form.value}
              onChange={handleChange("name")}
              variant="outlined"
            />
            
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12}>
            <TextField
              label="Student Name"
              fullWidth
              size="small"
              value={form.name}
              onChange={handleChange("name")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              size="small"
              value={form.studentClass}
              onChange={handleChange("studentClass")}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select Class</em>
              </MenuItem>
              {CLASSES.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              size="small"
              value={form.subject}
              onChange={handleChange("subject")}
              displayEmpty
            >
              <MenuItem value="">
                <em>Select Subject</em>
              </MenuItem>
              {SUBJECTS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="flex-end"
          mb={3}
        >
          {/* <Button
            variant="contained"
            color="primary"
            fullWidth={{ xs: true, sm: false }}
            onClick={() => navigate("/form")}
          >
            Next
          </Button> */}
          <Button
            variant="contained"
            sx={{ bgcolor: "rgba(20, 168, 124, 0.9)", }}
            fullWidth={{ xs: true, sm: false }}
            onClick={handleSubmit}
          >
            {editId ? "Update" : "Submit"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth={{ xs: true, sm: false }}
            onClick={() => {
              setForm({ name: "", studentClass: "", subject: "" });
              setEditId(null);
            }}
          >
            Clear
          </Button>
        </Stack>
        <Paper
        sx={{
          padding: "20px",
        }}
        >

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          // color="#1b4332"
          mb={1}
        >
          Student List
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "rgba(20, 168, 124, 0.9)", }}>
              <TableRow>
                {["Name", "Class", "Subject", "Actions"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No Records Found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.studentClass}</TableCell>
                    <TableCell>{s.subject}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(s.id)}
                        color="primary"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(s.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        </Paper>
        </Box>
      </Paper>
  );
}