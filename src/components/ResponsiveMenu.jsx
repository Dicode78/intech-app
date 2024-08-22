import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Logout,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/intechgroup-logo2.png";
import theme from "../theme";

// Utility function to convert hex to rgba
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ResponsiveMenu = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleClickOutsideContent = (e) => {
    if (e.target.getAttribute("data-outside") === "true") {
      toggleDrawer(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => toggleDrawer(true)}
        sx={{
          display: { lg: "none" },
          position: "fixed",
          top: "10px",
          right: "20px",
          zIndex: 1200,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(300deg, rgba(255, 255, 255, 0.7) 1%, rgba(238, 195, 163, 0.8) 17%, rgba(234, 165, 109, 0.9) 86%, rgba(229, 107, 1, 1) 99%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleClickOutsideContent}
          data-outside="true"
        >
          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              color: "#222",
              position: "absolute",
              top: "10px",
              right: "20px",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/homepage">
              <img
                src={logo}
                alt="Intech Group"
                style={{
                  maxWidth: "350px",
                  width: "80%",
                  margin: "0 auto",
                }}
              />
            </Link>
          </Box>

          <Box
            sx={{
              backgroundColor: hexToRgba(theme.palette.grey.light, 0.5),
              color: theme.palette.grey.dark,
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "400px",
              textAlign: "center",
              mt: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              zIndex: 1300,
            }}
            data-outside="false"
          >
            <List sx={{ width: "100%", textAlign: "center" }}>
              {user && user.role === "Admin" && (
                <ListItem
                  button
                  component={Link}
                  to="/user-management"
                  selected={location.pathname === "/user-management"}
                  sx={{
                    "&:hover": {
                      backgroundColor: hexToRgba(
                        theme.palette.primary.main,
                        0.5
                      ),
                    },
                    "&.Mui-selected": {
                      backgroundColor: hexToRgba(
                        theme.palette.primary.main,
                        0.5
                      ),
                      "&:hover": {
                        backgroundColor: hexToRgba(
                          theme.palette.primary.main,
                          0.7
                        ),
                      },
                    },
                  }}
                >
                  <ListItemText primary="Utilisateurs" />
                </ListItem>
              )}
              <ListItem
                button
                component={Link}
                to="/client-management"
                selected={location.pathname === "/client-management"}
                sx={{
                  "&:hover": {
                    backgroundColor: hexToRgba(theme.palette.primary.main, 0.5),
                  },
                  "&.Mui-selected": {
                    backgroundColor: hexToRgba(theme.palette.primary.main, 0.5),
                    "&:hover": {
                      backgroundColor: hexToRgba(
                        theme.palette.primary.main,
                        0.7
                      ),
                    },
                  },
                }}
              >
                <ListItemText primary="Clients" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Compétences" />
              </ListItem>
            </List>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              marginBottom: "10px",
              width: "100%",
              zIndex: 1300,
              marginTop: "120px",
            }}
            data-outside="false"
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginBottom: "20px" }}
            >
              Se déconnecter
            </Button>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.grey.dark,
                opacity: "50%",
                textAlign: "center",
              }}
            >
              &copy; 2024 / 2025 Intech Group
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveMenu;
