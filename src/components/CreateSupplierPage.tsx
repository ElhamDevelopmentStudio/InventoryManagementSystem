import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const CreateSupplierPage = ({ closeDialog }) => {
  const [supplierData, setSupplierData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    setSupplierData({
      ...supplierData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("CompanyName", supplierData.companyName);
    formData.append("ContactName", supplierData.contactName);
    formData.append("Phone", supplierData.phone);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/suppliers/",
        formData,
        {
          headers: {
            // If authentication is needed, add your token in the headers
            "Content-Type": "application/json",
          },
        }
      );
      closeDialog();
      // Add any additional success handling here
    } catch (error) {
      console.error("Error creating supplier:", error);
      // Update UI based on error
    }
  };

  return (
    <Dialog open onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle>Add a New Supplier</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="Supplier Name"
            name="companyName"
            value={supplierData.companyName}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="contactName"
            label="Contact Name"
            name="contactName"
            value={supplierData.contactName}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Contact Number"
            name="phone"
            value={supplierData.phone}
            onChange={handleInputChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Discard</Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Add Supplier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSupplierPage;
