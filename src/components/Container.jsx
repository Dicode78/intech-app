import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  marginLeft: "250px",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    marginLeft: "100px",
  },
}));

const ContainerComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContainerComponent;
