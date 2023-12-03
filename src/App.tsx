import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import InventoryPage from "./components/InventoryPage";
import SuppliersPage from "./components/SuppliersPage";
import OrdersPage from "./components/OrdersPage";
import LoginPage from "./components/LoginPage";
import CreateProductPage from "./components/CreateProductPage";
import CreateSupplierPage from "./components/CreateSupplierPage";
import ReportsPage from "./components/ReportsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <InventoryPage />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <InventoryPage />
            </Layout>
          }
        />
        <Route
          path="/suppliers"
          element={
            <Layout>
              <SuppliersPage />
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <OrdersPage />
            </Layout>
          }
        />
        <Route
          path="/product/create"
          element={
            <Layout>
              <CreateProductPage />
            </Layout>
          }
        />
        <Route
          path="/supplier/create"
          element={
            <Layout>
              <CreateSupplierPage closeDialog="something" />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <ReportsPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        {/* ...other routes... */}
      </Routes>
    </Router>
  );
}

export default App;
