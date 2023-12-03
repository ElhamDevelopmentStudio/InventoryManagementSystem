import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ReportIcon from "@mui/icons-material/Assessment";
import SupplierIcon from "@mui/icons-material/LocalShipping";
import OrderIcon from "@mui/icons-material/Reorder";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Drawer, Toolbar } from "@mui/material";
import { SearchBar } from "./SearchBar"; // Make sure you have this component

const drawerWidth = 240;

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
    >
      <Toolbar>
        <SearchBar /> {/* Integrated SearchBar at the top of the sidebar */}
      </Toolbar>
      <Divider />
      <List>
        {/* Dashboard */}
        <ListItem button key="Dashboard" onClick={() => navigate("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* Inventory */}
        <ListItem button key="Inventory" onClick={() => navigate("/inventory")}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        {/* Reports */}
        <ListItem button key="Reports" onClick={() => navigate("/reports")}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        {/* Suppliers */}
        <ListItem button key="Suppliers" onClick={() => navigate("/suppliers")}>
          <ListItemIcon>
            <SupplierIcon />
          </ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
        {/* Orders */}
        <ListItem button key="Orders" onClick={() => navigate("/orders")}>
          <ListItemIcon>
            <OrderIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        {/* Settings */}
        <ListItem button key="Settings" onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        {/* Logout */}
        <ListItem
          button
          key="Logout"
          onClick={() => {
            // Perform logout logic here
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
