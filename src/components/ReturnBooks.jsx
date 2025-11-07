import React, { useState, useEffect } from "react";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const initialData = {
  bookName: "",
  memberName: "",
  returnDate: new Date().toISOString().split("T")[0],
  fineAmount: "",
};

export default function ReturnBooks() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(initialData);
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [members, setMembers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  // this is stor on local storage on member
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("membersData"));
    if (storedMembers) {
      setMembers(storedMembers); // ✅ store in state
    }
  }, []);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const { bookName, memberName, returnDate, fineAmount } = form;

    if (!bookName || !memberName || !returnDate || !fineAmount) {
      setErrorMsg("Please fill all required fields!");
      setOpenSnack(true);
      return;
    }

    if (editId) {
      setBooks((prev) =>
        prev.map((b) => (b.id === editId ? { ...b, ...form } : b))
      );
      setEditId(null);
    } else {
      setBooks((prev) => [...prev, { id: Date.now(), ...form }]);
    }

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
          Return Books
        </Typography>

        <Grid container spacing={2.3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Book Name"
              fullWidth
              value={form.bookName}
              onChange={handleChange("bookName")}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Member name"
              fullWidth
              value={form.memberName}
              onChange={handleChange("memberName")}
            />
          </Grid> */}

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel>Member Name</InputLabel>
              <Select
                value={form.memberName}
                label="Member Name"
                onChange={handleChange("memberName")}
                sx={{ height: 56 }} // ✅ same as TextField
              >
                {members.map((m) => (
                  <MenuItem key={m.id} value={m.fullName}>
                    {m.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Return Date"
              type="date"
              fullWidth
              value={form.returnDate}
              onChange={handleChange("returnDate")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Fine Amount"
              fullWidth
              type="number"
              value={form.fineAmount}
              onChange={handleChange("fineAmount")}
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
          Return Book List
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "rgba(20, 168, 124, 0.9)" }}>
              <TableRow>
                {[
                  "S.no",
                  "Book Name",
                  "Member Name",
                  "Return Date",
                  "Fine Amount",
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
                  <TableCell colSpan={6} align="center">
                    No Records Found
                  </TableCell>
                </TableRow>
              ) : (
                books.map((b, index) => (
                  <TableRow key={b.id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{b.bookName}</TableCell>
                    <TableCell>{b.memberName}</TableCell>
                    <TableCell>{b.returnDate}</TableCell>
                    <TableCell>{b.fineAmount}</TableCell>
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
