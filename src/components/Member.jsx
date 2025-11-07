import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
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
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const initialData = {
  fullName: "",
  mobileNumber: "",
  email: "",
  memberShipDate: new Date().toISOString().split("T")[0],
  memberShipType: "",
  Address: "",
};

export default function Members() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(initialData);
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // const handleSubmit = () => {
  //   const {
  //     fullName,
  //     mobileNumber,
  //     email,
  //     memberShipDate,
  //     memberShipType,
  //     Address,
  //   } = form;

  //   if (
  //     !fullName ||
  //     !mobileNumber ||
  //     !email ||
  //     !memberShipDate ||
  //     !memberShipType ||
  //     !Address
  //   ) {
  //     alert("Please fill all fields!");
  //     return;
  //   }

  //   if (editId) {
  //     setBooks((prev) =>
  //       prev.map((b) => (b.id === editId ? { ...b, ...form } : b))
  //     );
  //     setEditId(null);
  //   } else {
  //     setBooks((prev) => [...prev, { id: Date.now(), ...form }]);
  //   }

  //   setForm(initialData);
  // };

  const handleSubmit = () => {
    const {
      fullName,
      mobileNumber,
      email,
      memberShipDate,
      memberShipType,
      Address,
    } = form;

    if (
      !fullName ||
      !mobileNumber ||
      !email ||
      !memberShipDate ||
      !memberShipType ||
      !Address
    ) {
      setErrorMsg("Please fill all required fields!");
      setOpenSnack(true);
      return;
    }

    let updatedList = [];

    if (editId) {
      updatedList = books.map((b) => (b.id === editId ? { ...b, ...form } : b));
      setEditId(null);
    } else {
      updatedList = [...books, { id: Date.now(), ...form }];
    }

    setBooks(updatedList);

    // ✅ Save entire member list in localStorage
    localStorage.setItem("membersData", JSON.stringify(updatedList));

    setForm(initialData);
  };

  const handleEdit = (id) => {
    const book = books.find((b) => b.id === id);
    setForm({ ...book });
    setEditId(id);
  };

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <Paper
      sx={{
        maxWidth: "100%",
        backgroundColor: "white",
        borderRadius: isMobile ? "0" : "3px",
        minHeight: "89vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setOpenSnack(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Box sx={{ p: { xs: 3, sm: 4 }, width: "100%", maxWidth: 1500 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{ color: "rgba(20, 168, 124, 0.9)" }}
        >
          Members
        </Typography>

        <Grid container spacing={2.3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Full Name"
              fullWidth
              value={form.fullName}
              onChange={handleChange("fullName")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Mobile"
              fullWidth
              value={form.mobileNumber}
              onChange={handleChange("mobileNumber")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange("email")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Member ship Date"
              type="date"
              fullWidth
              value={form.memberShipDate}
              onChange={handleChange("memberShipDate")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Member ship Type"
              fullWidth
              type="number"
              value={form.memberShipType}
              onChange={handleChange("memberShipType")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Address"
              fullWidth
              type="textarea"
              value={form.Address}
              onChange={handleChange("Address")}
            />
          </Grid>
        </Grid>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="flex-end"
          my={3}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "rgba(20, 168, 124, 0.9)" }}
            onClick={handleSubmit}
          >
            {editId ? "Update" : "Submit"}
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setForm(initialData);
              setEditId(null);
            }}
          >
            Clear
          </Button>
        </Stack>

        <Typography variant="h6" fontWeight="bold" mb={2} color="#3f3c3cff">
          Members List
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "rgba(20, 168, 124, 0.9)" }}>
              <TableRow>
                {[
                  "S.no",
                  "Full Name",
                  "Mobile",
                  "Email",
                  "Address",
                  "Member Ship Date",
                  "Member Ship Type",
                  "Actions",
                ].map((h) => (
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
              {books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Records Found
                  </TableCell>
                </TableRow>
              ) : (
                books.map((b, index) => (
                  <TableRow key={b.id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{b.fullName}</TableCell>
                    <TableCell>{b.mobileNumber}</TableCell>
                    <TableCell>{b.email}</TableCell>
                    <TableCell>{b.memberShipDate}</TableCell>
                    <TableCell>{b.memberShipType}</TableCell>
                    <TableCell>{b.Address}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(b.id)}
                        color="primary"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(b.id)}
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
      </Box>
    </Paper>
  );
}
