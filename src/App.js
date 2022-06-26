import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

import Menu from "./Components/Menu";
import CardMayKulay from "./Components/CardMayKulay";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

function App() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    size: "n/a",
    price: "",
    cost: "",
    stock: "",
  });
  const [items, setItems] = useState([]);
  const [costTotal, setCostTotal] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [stocksTotal, setStocksTotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [openItemModal, setOpenItemModal] = useState(false);
  const handleOpenItemModal = () => setOpenItemModal(true);
  const handleCloseItemModal = () => setOpenItemModal(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const handleTodoChange = (e) => {
    const value = e.target.value;
    setItem({
      ...item,
      [e.target.name]: value,
    });
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setItems([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => setItems((a) => [...a, item]));

        setCostTotal(
          Object.values(data).reduce(function (prev, current) {
            return prev + +current.cost;
          }, 0)
        );

        setPriceTotal(
          Object.values(data).reduce(function (prev, current) {
            return prev + +current.price;
          }, 0)
        );

        setStocksTotal(
          Object.values(data).reduce(function (prev, current) {
            return prev + +current.stock;
          }, 0)
        );

        setItemsTotal(Object.values(data).length);
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      uuid,
      name: item.name,
      category: item.category,
      size: item.size,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
    });

    setItem({
      name: "",
      category: "",
      size: "n/a",
      price: "",
      cost: "",
      stock: "",
    });

    handleCloseItemModal();
  };

  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Pips Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 8 }} maxWidth="md">
        <div sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={3}>
              <CardMayKulay
                title="Total Price"
                value={priceTotal}
                bgcolor="#ffb74d"
              />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CardMayKulay
                title="Total Cost"
                value={costTotal}
                bgcolor="#4fc3f7"
              />
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <CardMayKulay
                title="Total Stocks"
                value={stocksTotal}
                bgcolor="#66bb6a"
              />
            </Grid>
            
            <Grid item xs={12} md={3} lg={3}>
              <CardMayKulay
                title="Total Items"
                value={itemsTotal}
                bgcolor="#ab47bc"
              />
            </Grid>
          </Grid>
          <Menu items={items} />
          <Box
            m={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              onClick={handleOpenItemModal}
              variant="contained"
              color="primary"
              size="small"
            >
              Add
            </Button>

            <Modal
              open={openItemModal}
              onClose={handleCloseItemModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Item
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
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
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
                  <Box
                    m={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={writeToDatabase}
                    >
                      Submit
                    </Button>
                  </Box>
                </>
              </Box>
            </Modal>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default App;
