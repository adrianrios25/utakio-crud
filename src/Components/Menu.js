import React from "react";
import { db } from "../firebase";
import { useState } from "react";
import { ref, remove, update } from "firebase/database";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Menu({ items }) {
  const [item, setItem] = useState({
    name: "",
    category: "n/a",
    size: "",
    price: "",
    cost: "",
    stock: "",
  });
  const [tempUuid, setTempUuid] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTodoChange = (e) => {
    const value = e.target.value;
    setItem({
      ...item,
      [e.target.name]: value,
    });
  };

  const handleDelete = (item) => {
    remove(ref(db, `/${item.uuid}`));
  };

  //update
  const handleUpdate = (item) => {
    setTempUuid(item.uuid);
    setItem({
      name: item.name,
      category: item.category,
      size: item.size,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
    });

    handleOpen();
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      name: item.name,
      category: item.category,
      size: item.size,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
      uuid: tempUuid,
    });
    setItem("");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Item
          </Typography>
          <>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                label="Item Name"
                variant="outlined"
                name="name"
                value={item.name}
                onChange={handleTodoChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={item.category}
                label="Category"
                onChange={handleTodoChange}
              >
                <MenuItem value="First Course">First Course</MenuItem>
                <MenuItem value="Side Dish">Side Dish</MenuItem>
                <MenuItem value="Salad">Salad</MenuItem>
                <MenuItem value="Dessert">Dessert</MenuItem>
                <MenuItem value="Snacks">Snacks</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="size"
                value={item.size}
                label="Size"
                onChange={handleTodoChange}
              >
                <MenuItem value="n/a">N/A</MenuItem>
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                type="number"
                name="price"
                value={item.price}
                onChange={handleTodoChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                label="Cost"
                variant="outlined"
                type="number"
                name="cost"
                value={item.cost}
                onChange={handleTodoChange}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-basic"
                label="Stock"
                variant="outlined"
                type="number"
                name="stock"
                value={item.stock}
                onChange={handleTodoChange}
              />
            </FormControl>
            <Stack direction="row" spacing={2} sx={{ py: 2 }}>
              <Button
                onClick={handleSubmitChange}
                variant="contained"
                color="success"
                size="small"
              >
                Update
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                size="small"
              >
                cancel
              </Button>{" "}
            </Stack>
          </>
        </Box>
      </Modal>

      <Container sx={{ py: 2 }}>
        <Typography variant="h4" component="div">
          Menu
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.category}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={() => handleUpdate(item)}
                        variant="contained"
                        color="success"
                        size="small"
                      >
                        update
                      </Button>
                      <Button
                        onClick={() => handleDelete(item)}
                        variant="contained"
                        color="error"
                        size="small"
                      >
                        delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Menu;
