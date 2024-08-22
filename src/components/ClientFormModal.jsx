import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const ClientFormModal = ({
  open,
  onClose,
  onAddClient,
  onUpdateClient,
  editingClient,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    societe_entite_clients: "",
    secteur_activite_entite_clients: "",
    pays_adresse_clients: "",
    region_adresse_clients: "",
    ville_adresse_clients: "",
    code_postal_adresse_clients: "",
    voie_adresse_clients: "",
    numero_adresse_clients: "",
    sites_entite_clients: "",
    tel_entite_clients: "",
  });
  const [modifiedFields, setModifiedFields] = useState({});

  useEffect(() => {
    if (editingClient) {
      axios
        .get(
          `http://localhost:5001/api/clients/${editingClient.id_entite_clients}`,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        )
        .then((response) => {
          const data = response.data;
          setFormData({
            societe_entite_clients: data.societe_entite_clients || "",
            secteur_activite_entite_clients:
              data.secteur_activite_entite_clients || "",
            pays_adresse_clients: data.pays_adresse_clients || "",
            region_adresse_clients: data.region_adresse_clients || "",
            ville_adresse_clients: data.ville_adresse_clients || "",
            code_postal_adresse_clients: data.code_postal_adresse_clients || "",
            voie_adresse_clients: data.voie_adresse_clients || "",
            numero_adresse_clients: data.numero_adresse_clients || "",
            sites_entite_clients: data.sites_entite_clients || "",
            tel_entite_clients: data.tel_entite_clients || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching client details:", error);
        });
    } else {
      setFormData({
        societe_entite_clients: "",
        secteur_activite_entite_clients: "",
        pays_adresse_clients: "",
        region_adresse_clients: "",
        ville_adresse_clients: "",
        code_postal_adresse_clients: "",
        voie_adresse_clients: "",
        numero_adresse_clients: "",
        sites_entite_clients: "",
        tel_entite_clients: "",
      });
    }
    setModifiedFields({});
  }, [editingClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setModifiedFields({ ...modifiedFields, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const headers = {
      "x-auth-token": token,
    };

    const formattedData = {
      ...formData,
      societe_entite_clients: formData.societe_entite_clients.toUpperCase(),
      secteur_activite_entite_clients: capitalizeFirstLetter(
        formData.secteur_activite_entite_clients
      ),
      pays_adresse_clients: formData.pays_adresse_clients.toUpperCase(),
      region_adresse_clients: formData.region_adresse_clients,
      ville_adresse_clients: formData.ville_adresse_clients.toUpperCase(),
      sites_entite_clients: capitalizeFirstLetter(
        formData.sites_entite_clients
      ),
      tel_entite_clients: formData.tel_entite_clients,
    };

    if (editingClient) {
      axios
        .put(
          `http://localhost:5001/api/clients/${editingClient.id_entite_clients}`,
          formattedData,
          { headers }
        )
        .then((response) => {
          onUpdateClient(response.data);
          onClose();
        })
        .catch((error) => {
          console.error("Error updating client:", error);
        });
    } else {
      axios
        .post("http://localhost:5001/api/clients", formattedData, { headers })
        .then((response) => {
          onAddClient(response.data);
          onClose();
        })
        .catch((error) => {
          console.error("Error adding client:", error);
        });
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const regions = [
    "Île-de-France",
    "Centre-Val de Loire",
    "Grand Est",
    "Hauts-de-France",
    "Normandie",
    "Bretagne",
    "Pays de la Loire",
    "Bourgogne-Franche-Comté",
    "Nouvelle-Aquitaine",
    "Auvergne-Rhône-Alpes",
    "Occitanie",
    "Provence-Alpes-Côtes d'Azur",
    "Corse",
    "Réunion",
    "Martinique",
    "Guadeloupe",
    "Guyane",
    "Nouvelle-Calédonie",
  ];

  const getTextFieldStyle = (fieldName) => ({
    color: theme.palette.primary.main,
    fontFamily:
      editingClient && !modifiedFields[fieldName]
        ? theme.typography.italic.fontFamily
        : "inherit",
    opacity: editingClient && !modifiedFields[fieldName] ? 0.7 : 1,
    "& .MuiInputBase-input": {
      color: theme.palette.primary.main,
      fontFamily:
        editingClient && !modifiedFields[fieldName]
          ? theme.typography.italic.fontFamily
          : "inherit",
      opacity: editingClient && !modifiedFields[fieldName] ? 0.7 : 1,
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
        <Typography variant="h6" sx={{ marginBottom: "15px" }}>
          {editingClient ? "Modifier le client" : "Ajouter un client"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Société"
            name="societe_entite_clients"
            value={formData.societe_entite_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("societe_entite_clients")}
          />
          <TextField
            label="Secteur d'activité"
            name="secteur_activite_entite_clients"
            value={formData.secteur_activite_entite_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("secteur_activite_entite_clients")}
          />
          <TextField
            label="Pays"
            name="pays_adresse_clients"
            value={formData.pays_adresse_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("pays_adresse_clients")}
          />
          <TextField
            select
            label="Région"
            name="region_adresse_clients"
            value={formData.region_adresse_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("region_adresse_clients")}
          >
            {regions.map((region) => (
              <MenuItem
                key={region}
                value={region}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                {region}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Ville"
            name="ville_adresse_clients"
            value={formData.ville_adresse_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("ville_adresse_clients")}
          />
          <TextField
            label="Code postal"
            name="code_postal_adresse_clients"
            value={formData.code_postal_adresse_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("code_postal_adresse_clients")}
          />
          <TextField
            label="Voie"
            name="voie_adresse_clients"
            value={formData.voie_adresse_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("voie_adresse_clients")}
          />
          <TextField
            label="Numéro de la voie"
            name="numero_adresse_clients"
            value={formData.numero_adresse_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("numero_adresse_clients")}
          />
          <TextField
            label="Sites internet"
            name="sites_entite_clients"
            value={formData.sites_entite_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("sites_entite_clients")}
          />
          <TextField
            label="Téléphone"
            name="tel_entite_clients"
            value={formData.tel_entite_clients}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={getTextFieldStyle("tel_entite_clients")}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "15px" }}
          >
            {editingClient ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ClientFormModal;
