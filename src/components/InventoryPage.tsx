import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Dialog,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import CreateProductPage from "./CreateProductPage";

const BASE_URL = "http://127.0.0.1:8000/";

interface Product {
  id: number;
  name: string;
  category: number; // Assuming category is referenced by ID
  supplier: number; // Assuming supplier is referenced by ID
  unitprice: number;
  unitsInStock: number;
}

interface Category {
  id: number;
  name: string;
}

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreateProductOpen, setCreateProductOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const authToken = localStorage.getItem("access");
      try {
        const productsResponse = await axios.get<Product[]>(
          `${BASE_URL}api/products/`
        );
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get<Category[]>(
          `${BASE_URL}api/categories/`
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        console.log(authToken);
      }
    };

    fetchProducts();
  }, []);

  // Function to get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const handleAddProductClick = () => {
    setCreateProductOpen(true);
  };

  const handleCloseCreateProduct = () => {
    setCreateProductOpen(false);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Overall Inventory Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Typography variant="subtitle1">14</Typography>
              {/* ... other overview data */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="subtitle1">868</Typography>
              {/* ... other overview data */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Selling</Typography>
              <Typography variant="subtitle1">5</Typography>
              {/* ... other overview data */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Low Stocks</Typography>
              <Typography variant="subtitle1">12</Typography>
              {/* ... other overview data */}
            </CardContent>
          </Card>
        </Grid>

        {/* Products Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Products</Typography>
              <Box>
                {/* Action Buttons */}
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ mr: 1 }}
                  onClick={handleAddProductClick}
                >
                  Add Product
                </Button>
                <Dialog
                  open={isCreateProductOpen}
                  onClose={handleCloseCreateProduct}
                  aria-labelledby="create-product-dialog-title"
                  fullWidth
                  maxWidth="sm"
                >
                  <CreateProductPage closeDialog={handleCloseCreateProduct} />
                </Dialog>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{ mr: 1 }}
                >
                  Filters
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  Download all
                </Button>
              </Box>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Units In Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{getCategoryName(product.category)}</TableCell>
                    <TableCell>{product.unitprice}</TableCell>
                    <TableCell>{product.unitsInStock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InventoryPage;
