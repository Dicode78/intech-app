import React from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";
import { useTheme } from "@mui/material/styles";

const ClientDetailModal = ({ open, onClose, client }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "transparent",
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          position: "relative",
          margin: "0 auto", // Centrer le modal horizontalement
          width: {
            xs: "calc(100% - 20px)", // Pour très petits écrans
            sm: "calc(100% - 40px)", // Pour petits écrans
            md: "calc(100% - 60px)", // Pour écrans moyens
            lg: "calc(82% - 70px)", // Pour grands écrans (1200px et plus)
            xl: "calc(100% - 320px)", // Pour écrans extra-larges
          },
          maxWidth: "100%", // Limite la largeur pour qu'elle ne s'étire pas trop sur des très grands écrans
          height: "calc(100vh - 150px)",
          marginLeft: {
            lg: "285px", // Appliquer une marge à gauche pour les grands écrans (1200px et plus)
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.down("sm")]: {
            height: "calc(100vh - 100px)",
          },
        }}
      >
        {/* Calque de flou */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: "blur(8px)",
            zIndex: 1,
            borderRadius: "12px",
          }}
        />

        {/* Contenu du modal */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(238, 195, 163, 0.8)",
            padding: "40px",
            boxSizing: "border-box",
            top: "-2px",
            height: "100%",
            width: "100%",
            boxShadow: "0px 4px 8px 16px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            [theme.breakpoints.down("sm")]: {
              padding: "20px",
              top: "-10px",
              height: "calc(100vh - 120px)",
              width: "calc(100% - 2px)",
            },
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#000",
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "20px",
              marginLeft: "10px",
              fontFamily: theme.typography.black.fontFamily,
              [theme.breakpoints.down("sm")]: {
                marginLeft: "5px",
                marginBottom: "10px",
                fontSize: "2rem",
              },
            }}
          >
            {client.societe_entite_clients}
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <LocationOnIcon
              sx={{ marginRight: "10px", color: theme.palette.text.primary }}
            />
            <Typography variant="body1">
              {client.numero_adresse_clients}, {client.voie_adresse_clients} -{" "}
              {client.code_postal_adresse_clients} -{" "}
              {client.ville_adresse_clients} - {client.pays_adresse_clients}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <PhoneIcon
              sx={{ marginRight: "10px", color: theme.palette.text.primary }}
            />
            <Typography variant="body1">{client.tel_entite_clients}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <LanguageIcon
              sx={{ marginRight: "10px", color: theme.palette.text.primary }}
            />
            <Typography variant="body1">
              {client.sites_entite_clients}
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
          >
            <BusinessIcon
              sx={{ marginRight: "10px", color: theme.palette.text.primary }}
            />
            <Typography variant="body1">
              {client.secteur_activite_entite_clients}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ClientDetailModal;
