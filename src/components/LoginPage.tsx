import React, { useState } from "react";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Changed from email to username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset error message before a new login attempt
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/token/",
        {
          username, // Changed from email to username
          password,
        }
      );
      // Check if tokens exist in the response
      if (response.data.access && response.data.refresh) {
        // Save the tokens in localStorage or in a safer place like httpOnly cookies
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        // Redirect to the inventory page
        navigate("/inventory");
      } else {
        setError("Invalid server response. Tokens not found.");
        console.log(response.data);
      }
    } catch (err) {
      setError("Invalid credentials or server error");
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
