import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Dialog,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import CreateSupplierPage from "./CreateSupplierPage";

interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  phone: string;
  // Add any other fields you expect from the API
}

const BASE_URL = "http://127.0.0.1:8000/";

const SuppliersPage = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get<Supplier[]>(
          `${BASE_URL}api/suppliers/`
        );
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  // Sample data for the suppliers table
  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  // Function to close the dialog
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header and Action Buttons */}
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" component="h2">
            Suppliers
          </Typography>
          <Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
              onClick={handleOpenCreateDialog}
            >
              Add Supplier
            </Button>
            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
              <CreateSupplierPage closeDialog={handleCloseCreateDialog} />
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
        </Grid>

        {/* Suppliers Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, width: "100%", mb: 2 }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Contact Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  {/* Add any other relevant columns */}
                </TableRow>
              </TableHead>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.companyName}</TableCell>
                    <TableCell>{supplier.contactName}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    {/* Display other fields as needed */}
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

export default SuppliersPage;
