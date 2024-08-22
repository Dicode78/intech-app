import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const UserFormModal = ({
  open,
  onClose,
  onAddUser,
  onUpdateUser,
  editingUser, // Prop pour l'utilisateur à éditer
}) => {
  const theme = useTheme(); // Ajout de useTheme pour utiliser le thème
  const [formData, setFormData] = useState({
    username_users: "",
    password_users: "",
    confirm_password_users: "",
    societe_profile: "",
    nom_profile: "",
    prenom_profile: "",
    role_profile: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [modifiedFields, setModifiedFields] = useState({});

  // Utilisation de useEffect pour pré-remplir le formulaire en cas de modification
  useEffect(() => {
    if (editingUser) {
      setFormData({
        username_users: editingUser.username_users,
        password_users: "",
        confirm_password_users: "",
        societe_profile: editingUser.societe_profile,
        nom_profile: editingUser.nom_profile,
        prenom_profile: editingUser.prenom_profile,
        role_profile: editingUser.role_profile,
      });
    } else {
      // Réinitialiser le formulaire en cas d'ajout
      setFormData({
        username_users: "",
        password_users: "",
        confirm_password_users: "",
        societe_profile: "",
        nom_profile: "",
        prenom_profile: "",
        role_profile: "",
      });
    }
    setModifiedFields({});
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setModifiedFields({ ...modifiedFields, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password_users !== formData.confirm_password_users) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setError("");

    const token = localStorage.getItem("token");

    const headers = {
      "x-auth-token": token,
    };

    if (editingUser) {
      // Mode édition
      axios
        .put(
          `http://localhost:5001/api/users/${editingUser.id_users}`,
          formData,
          { headers }
        )
        .then((response) => {
          onUpdateUser(response.data);
          onClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login"); // Assurez-vous que navigate est bien défini
          } else {
            console.error("Error updating user:", error);
          }
        });
    } else {
      // Mode ajout
      axios
        .post("http://localhost:5001/api/users", formData, { headers })
        .then((response) => {
          onAddUser(response.data);
          onClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            navigate("/login"); // Assurez-vous que navigate est bien défini
          } else {
            console.error("Error adding user:", error);
          }
        });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getTextFieldStyle = (fieldName) => ({
    color: theme.palette.primary.main,
    fontFamily:
      editingUser && !modifiedFields[fieldName]
        ? theme.typography.italic.fontFamily
        : "inherit",
    opacity: editingUser && !modifiedFields[fieldName] ? 0.7 : 1,
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main,
      fontFamily:
        editingUser && !modifiedFields[fieldName]
          ? theme.typography.italic.fontFamily
          : "inherit",
      opacity: editingUser && !modifiedFields[fieldName] ? 0.7 : 1,
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          width: { xs: "90%", sm: "450px" },
          maxHeight: "90vh",
          overflowY: "auto",
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          {editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Identifiant"
            name="username_users"
            value={formData.username_users}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("username_users")}
          />
          <TextField
            label="Mot de passe"
            name="password_users"
            type={showPassword ? "text" : "password"}
            value={formData.password_users}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirmer le mot de passe"
            name="confirm_password_users"
            type={showPassword ? "text" : "password"}
            value={formData.confirm_password_users}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: "10px" }}
            >
              {error}
            </Typography>
          )}
          <TextField
            label="Société"
            name="societe_profile"
            value={formData.societe_profile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("societe_profile")}
          />
          <TextField
            label="Nom"
            name="nom_profile"
            value={formData.nom_profile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("nom_profile")}
          />
          <TextField
            label="Prénom"
            name="prenom_profile"
            value={formData.prenom_profile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("prenom_profile")}
          />
          <TextField
            select
            label="Rôle"
            name="role_profile"
            value={formData.role_profile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("role_profile")}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Utilisateur">Utilisateur</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
          >
            {editingUser ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default UserFormModal;
