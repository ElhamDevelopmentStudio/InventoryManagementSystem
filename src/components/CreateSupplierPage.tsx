import React, { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

const CreateSupplierPage = ({ closeDialog }) => {
  const [supplierData, setSupplierData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    // Additional fields as required by your UI and API
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const authToken = localStorage.getItem("authToken");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupplierData({
      ...supplierData,
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
    formData.append("CompanyName", supplierData.companyName);
    formData.append("ContactName", supplierData.contactName);
    formData.append("Phone", supplierData.phone);
    // Add the image to the formData if needed by your API
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/suppliers/",
        formData
      );
      // Handle the response here, such as closing the dialog and resetting the form
      closeDialog();
    } catch (error) {
      // Handle the error here, such as displaying an error message to the user
      console.error(error);
    }
  };

  return (
    <Dialog open onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle>Add a New Supplier</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Form fields */}
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
          {/* Include additional fields as per your API requirements */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Discard</Button>
        <Button type="submit" color="primary">
          Add Supplier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSupplierPage;
