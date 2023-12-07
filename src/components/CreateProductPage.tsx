import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

interface Category {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  companyName: string;
}

const CreateProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    supplier: "",
    unitprice: "",
    unitsInStock: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    // Fetch categories and suppliers
    const fetchCategories = async () => {
      const response = await axios.get<Category[]>(
        "http://127.0.0.1:8000/api/categories/"
      );
      setCategories(response.data);
    };

    const fetchSuppliers = async () => {
      const response = await axios.get<Supplier[]>(
        "http://127.0.0.1:8000/api/suppliers/"
      );
      setSuppliers(response.data);
    };

    fetchCategories();
    fetchSuppliers();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Name", productData.name);
    formData.append("Category", productData.category);
    formData.append("Supplier", productData.supplier);
    formData.append("Unitprice", productData.unitprice);
    formData.append("UnitsInStock", productData.unitsInStock);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/",
        formData
      );
      console.log(response.data);
      console.log("Successful Submission");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, padding: 4 }}>
        <Typography component="h1" variant="h5">
          New Product
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Image upload */}
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{ mt: 2 }}
            >
              {selectedImage ? "Change Image" : "Upload Image"}
            </Button>
          </label>
          {/* Product name */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={productData.name}
            onChange={handleInputChange}
          />
          {/* Category - Should be fetched from the API and mapped to MenuItems */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={productData.category}
              label="Category"
              onChange={handleSelectChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Supplier - Should be fetched from the API and mapped to MenuItems */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="supplier-label">Supplier</InputLabel>
            <Select
              labelId="supplier-label"
              id="supplier"
              name="supplier"
              value={productData.supplier}
              label="Supplier"
              onChange={handleSelectChange}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Unit price */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="unitprice"
            label="Buying Price"
            name="unitprice"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={productData.unitprice}
            onChange={handleInputChange}
          />
          {/* Units in stock */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="unitsInStock"
            label="Quantity"
            name="unitsInStock"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={productData.unitsInStock}
            onChange={handleInputChange}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" onClick={() => console.log("Discard")}>
              Discard
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateProductPage;
