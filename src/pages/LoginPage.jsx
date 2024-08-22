import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import {
  Container as MuiContainer,
  TextField,
  Button,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { Visibility, VisibilityOff, InfoOutlined } from "@mui/icons-material";
import logo from "../assets/intechgroup-logo2.png";
import banner from "../assets/intechgroup-bg-home.jpg";

const Root = styled("div")({
  height: "100vh",
  width: "100vw",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: `linear-gradient(to bottom, #EFE1E0 100vh, #EFE1E0 100vh)`,
});

const Banner = styled("div")({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "60vh",
  background: `url(${banner}) no-repeat bottom`,
  backgroundSize: "cover",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "50px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
  width: "100%",
  maxWidth: "600px",
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "600px",
    height: "auto",
  },
  [theme.breakpoints.down("xs")]: {
    maxWidth: "95%",
    height: "auto",
  },
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    fontFamily: "Neo Sans Std",
  },
  "& .MuiOutlinedInput-root": {
    fontFamily: "Neo Sans Std",
    borderRadius: "15px",
  },
  marginBottom: "10px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "50px",
  marginBottom: "16px",
  background: `linear-gradient(to bottom, ${theme.palette.warning.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  transition: "background 0.3s ease, color 0.1s ease",
  "&:hover": {
    background: "transparent",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
  },
  fontFamily: theme.typography.bold.fontFamily,
  fontSize: "1.2em",
  borderRadius: "10px",
}));

const Logo = styled("img")(({ theme }) => ({
  width: "80%",
  maxWidth: "500px",
  marginBottom: "50px",
  transition: "width 0.3s ease, max-width 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "250px",
  },
}));

const CustomContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  position: "relative",
  zIndex: 1,
});

const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  marginTop: "16px",
  cursor: "pointer",
  color: theme.palette.grey.dark,
  textDecoration: "none",
  transition: "color 0.2s ease",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const CenteredForgotPasswordLink = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.success) {
        const user = {
          id: response.user.id,
          prenom_profile: response.user.prenom_profile,
          nom_profile: response.user.nom_profile,
          role: response.user.role,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.token);
        navigate("/homepage");
      } else {
        setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendRequest = () => {
    console.log("Request sent for", fullName);
    handleClose();
  };

  return (
    <Root>
      <Banner />
      <CustomContainer>
        <MuiContainer
          component="main"
          sx={{ width: "100%", maxWidth: "900px" }}
        >
          <StyledPaper elevation={6}>
            <Logo src={logo} alt="Intech Group" />
            <Box component="form" onSubmit={handleLogin} noValidate>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Identifiant"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errorMessage && (
                <Box
                  sx={{ color: "red", textAlign: "center", marginTop: "10px" }}
                >
                  {errorMessage}
                </Box>
              )}
              <StyledButton type="submit" fullWidth variant="contained">
                CONNEXION
              </StyledButton>
              <CenteredForgotPasswordLink>
                <ForgotPasswordLink onClick={handleClickOpen}>
                  Identifiant / Mot de passe oublié ?
                </ForgotPasswordLink>
              </CenteredForgotPasswordLink>
            </Box>
          </StyledPaper>
        </MuiContainer>
      </CustomContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Identifiant / Mot de passe oublié ?
          <Tooltip title="Veuillez saisir votre nom et prénom, en les soumettant, l'administrateur du site recevra un e-mail automatique l'alertant de votre besoin d'assistance à la connexion.">
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            id="fullName"
            label="Nom et Prénom"
            type="text"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSendRequest} color="primary">
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export default LoginPage;
