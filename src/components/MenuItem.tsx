import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface MenuItemProps {
  title: string;
  // Add more props if needed like onClick, isActive, etc.
}

const MenuItem: React.FC<MenuItemProps> = ({ title }) => {
  return (
    <Box p={2} _hover={{ bg: "gray.200", cursor: "pointer" }}>
      <Text>{title}</Text>
    </Box>
  );
};

export default MenuItem;
