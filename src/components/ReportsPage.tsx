import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";

interface RevenueData {
  revenue: number;
}

interface BestSeller {
  product: string;
  productId: number;
  category: string;
  remainingQuantity: number | string; // Adjust based on actual data type
  turnOver: number;
  increaseBy: string;
}

interface OutOfStockProduct {
  id: number;
  name: string;
  category: string;
  remainingQuantity: number;
  turnOver: number;
}

const ReportsPage = () => {
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([]);
  const [outOfStock, setOutOfStock] = useState<OutOfStockProduct[]>([]);
  const [stockToAdd, setStockToAdd] = useState<{ [key: number]: number }>({});
  const [revenueData, setRevenueData] = useState<RevenueData>({ revenue: 0 });

  useEffect(() => {
    // Fetch Revenue
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/stats/revenue/"
        );
        setRevenueData({ revenue: response.data.revenue }); // assuming response.data is the object shown above
      } catch (error) {
        console.error("Error fetching revenue", error);
      }
    };
    // Fetch Best Sellers
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/stats/best_seller/"
        );
        setBestSellers(response.data.best_sellers);
      } catch (error) {
        console.error("Error fetching best sellers", error);
      }
    };

    const fetchOutOfStock = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/stats/out_of_stock/"
        );
        if (response.data) {
          setOutOfStock(response.data);
        }
      } catch (error) {
        console.error("Error fetching out of stock products", error);
      }
    };

    fetchRevenue();
    fetchBestSellers();
    fetchOutOfStock();
  }, []);

  const handleStockChange = (productId: number, value: string) => {
    setStockToAdd((prev) => ({ ...prev, [productId]: Number(value) }));
  };

  const handleAddStock = async (productId: number) => {
    const stock = stockToAdd[productId];
    if (stock <= 0) {
      console.error("Stock to add must be greater than 0");
      return;
    }

    // Call the API to add stock
    try {
      const response = await axios.post("/api/add_stock/", {
        id: productId,
        stock: stock,
      });
      // Handle the response, such as resetting the input field and updating the table
      setStockToAdd((prev) => ({ ...prev, [productId]: 0 }));
      // Optionally, refresh your out-of-stock products list
    } catch (error) {
      console.error("Error adding stock", error);
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Revenue Card */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Overview</Typography>
            <Typography variant="subtitle1">₹{revenue}</Typography>
          </Paper>
        </Grid>

        {/* Best Selling Products Table */}
        <Grid item xs={12} sm={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Best selling product</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Remaining Quantity</TableCell>
                  <TableCell>Turn Over</TableCell>
                  <TableCell>Increase By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bestSellers && bestSellers.length > 0 ? (
                  bestSellers.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell>{product.product}</TableCell>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.remainingQuantity}</TableCell>
                      <TableCell>{product.turnOver}</TableCell>
                      <TableCell>{product.increaseBy}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      No best selling products data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Out Of Stock Products Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Out Of Stock Products</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Remaining Quantity</TableCell>
                  <TableCell>Turn Over</TableCell>
                  <TableCell>Add Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outOfStock && outOfStock.length > 0 ? (
                  outOfStock.map((product) => (
                    <TableRow key={product.id}>
                      {/* ... other table cells ... */}
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TextField
                            size="small"
                            type="number"
                            placeholder="Add stock"
                            value={stockToAdd[product.id] || ""}
                            onChange={(e) =>
                              handleStockChange(product.id, e.target.value)
                            }
                            sx={{ mr: 1 }}
                          />
                          <Button
                            onClick={() => handleAddStock(product.id)}
                            variant="contained"
                            size="small"
                          >
                            Add
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      No out of stock data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ReportsPage;
