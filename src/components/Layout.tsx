import React, { ReactNode } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Sidebar } from "./SideBar";

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode; // This line explicitly types the children prop
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />{" "}
        {/* This pushes the content down below the AppBar if you have one. */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
