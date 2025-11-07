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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const initialData = {
  bookName: "",
  author: "",
  publisher: "",
  yearOfPublication: new Date().toISOString().split("T")[0],
  numberOfCopies: "",
  availableCopies: "",
};

export default function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [form, setForm] = useState(initialData);
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const {
      bookName,
      author,
      publisher,
      yearOfPublication,
      numberOfCopies,
      availableCopies,
    } = form;

    if (
      !bookName ||
      !author ||
      !publisher ||
      !yearOfPublication ||
      !numberOfCopies ||
      !availableCopies
    ) {
      alert("Please fill all fields!");
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
        minHeight: "530px",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ p: { xs: 3, sm: 4 }, width: "100%", maxWidth: 1500 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{ color: "rgba(20, 168, 124, 0.9)" }}
        >
          Add Books
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

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Author"
              fullWidth
              value={form.author}
              onChange={handleChange("author")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Publisher"
              fullWidth
              value={form.publisher}
              onChange={handleChange("publisher")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Year Of Publication"
              type="date"
              fullWidth
              value={form.yearOfPublication}
              onChange={handleChange("yearOfPublication")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Number Of Copies"
              fullWidth
              type="number"
              value={form.numberOfCopies}
              onChange={handleChange("numberOfCopies")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Available Copies"
              fullWidth
              type="number"
              value={form.availableCopies}
              onChange={handleChange("availableCopies")}
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
            Book List
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "rgba(20, 168, 124, 0.9)" }}>
                <TableRow>
                  {[
                    "S.no",
                    "Book Name",
                    "Author",
                    "Publisher",
                    "Published Year",
                    "Copies",
                    "Available",
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
                  books.map((b,index) => (
                    <TableRow key={b.id} hover>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{b.bookName}</TableCell>
                      <TableCell>{b.author}</TableCell>
                      <TableCell>{b.publisher}</TableCell>
                      <TableCell>{b.yearOfPublication}</TableCell>
                      <TableCell>{b.numberOfCopies}</TableCell>
                      <TableCell>{b.availableCopies}</TableCell>
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
