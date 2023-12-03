import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import HistoryIcon from "@mui/icons-material/History";
import axios from "axios";

// Define an interface for order data
interface Order {
  id: number;
  customer: number;
  orderDate: string;
  shipVia: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Styles
  const cardStyle = {
    backgroundColor: "#f5f5f5",
  };
  const headerStyle = {
    backgroundColor: "#e0e0e0",
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4, backgroundColor: "#fff" }}>
      {" "}
      {/* Assuming the background is white */}
      <Grid container spacing={3}>
        {/* Overall Orders Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="subtitle1">4</Typography>
              {/* ... other overview data */}
            </CardContent>
          </Card>
        </Grid>
        {/* ... Repeat for Total Received, Total Returned, On the way */}

        {/* Orders Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, width: "100%", mb: 2, backgroundColor: "#fff" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Orders</Typography>
              <Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ mr: 1, backgroundColor: "#1976d2" }}
                >
                  Add Product
                </Button>{" "}
                {/* Primary button color */}
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{ mr: 1 }}
                >
                  Filters
                </Button>
                <Button variant="outlined" startIcon={<HistoryIcon />}>
                  Order History
                </Button>
              </Box>
            </Box>
            <Table size="medium">
              <TableHead>
                <TableRow sx={headerStyle}>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Ship Via</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.shipVia}</TableCell>
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

export default OrdersPage;
