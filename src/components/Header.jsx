import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "../assets/intechgroup-logo2.png";
import ResponsiveMenu from "./ResponsiveMenu";

const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "250px",
  height: "100vh",
  background: `linear-gradient(to bottom, ${theme.palette.common.white} 0%, ${theme.palette.primary.main} 75%, ${theme.palette.secondary.main} 100%)`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  position: "fixed",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  top: 0,
  left: 0,
  transition: "width 0.3s",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "95%",
  maxWidth: "150px",
  transition: "width 0.3s",
  position: "fixed",
  top: "20px",
  left: "50px",
  zIndex: 1200,
  [theme.breakpoints.down("lg")]: {
    maxWidth: "130px",
    top: "10px",
    left: "10px",
  },
}));

const WelcomeMessage = styled(Typography)(({ theme }) => ({
  marginTop: "160px",
  fontFamily: theme.typography.medium.fontFamily,
  color: theme.palette.grey.dark,
  textAlign: "center",
}));

const MenuContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "120px",
  transition: "font-size 0.3s, margin-top 0.3s",
}));

const MenuTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.bold.fontFamily,
  color: theme.palette.grey.dark,
}));

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const MenuItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.grey.dark,
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
    pointerEvents: "none", // Désactive le hover sur l'élément actif
  },
  "&:hover:not(.Mui-selected)": {
    backgroundColor: hexToRgba(theme.palette.primary.main, 0.5),
    borderRadius: "4px",
  },
}));

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  textAlign: "center",
  width: "100%",
  transition: "font-size 0.3s",
}));

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <HeaderContainer>
        <Link to="/homepage">
          <Logo src={logo} alt="Intech Group" />
        </Link>

        {user && (
          <WelcomeMessage variant="h6">
            Bonjour, {user.prenom_profile} !
          </WelcomeMessage>
        )}

        <MenuContainer>
          <MenuTitle variant="h6">Menu</MenuTitle>
          <List>
            {user && user.role === "Admin" && (
              <MenuItem
                button
                component={Link}
                to="/user-management"
                selected={location.pathname === "/user-management"}
              >
                <ListItemText primary="Utilisateurs" />
              </MenuItem>
            )}
            <MenuItem
              button
              component={Link}
              to="/client-management"
              selected={location.pathname === "/client-management"}
            >
              <ListItemText primary="Clients" />
            </MenuItem>
            <MenuItem button>
              <ListItemText primary="Compétences" />
            </MenuItem>
          </List>
        </MenuContainer>
        <FooterContainer>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Logout />}
            style={{ marginBottom: "30px" }}
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
          <Typography variant="body2" color="white" style={{ opacity: "50%" }}>
            &copy; 2024 / 2025 Intech Group
          </Typography>
        </FooterContainer>
      </HeaderContainer>
      <ResponsiveMenu user={user} />
    </>
  );
};

export default Header;
