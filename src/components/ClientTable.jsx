import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ClientTable = ({
  clients,
  onClientDelete,
  onClientEdit,
  onClientView,
}) => {
  const theme = useTheme();
  const [selectedSociete, setSelectedSociete] = useState([]);
  const [selectedSecteur, setSelectedSecteur] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedVille, setSelectedVille] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setOpenConfirm(true);
  };

  const handleConfirmClose = (confirmed) => {
    setOpenConfirm(false);
    if (confirmed && clientToDelete) {
      onClientDelete(clientToDelete.id_entite_clients);
    }
    setClientToDelete(null);
  };

  const handleFilterChange = (event, setSelected) => {
    const value = event.target.value;

    if (value.includes("Reset")) {
      setSelected([]); // Réinitialise le filtre en le mettant à un tableau vide
    } else {
      setSelected(typeof value === "string" ? value.split(",") : value);
    }
  };

  const applyFilter = (items, selected, field) => {
    if (selected.length === 0 || selected.includes("Reset")) return items;
    return items.filter((item) => selected.includes(item[field]));
  };

  const getUniqueValues = (field) => {
    return Array.from(new Set(clients.map((client) => client[field])));
  };

  const renderFilterSelect = (
    label,
    selected,
    setSelected,
    field,
    cellSx = {}
  ) => (
    <TableCell sx={{ padding: "5px 18px", ...cellSx }}>
      <Select
        multiple
        displayEmpty
        value={selected}
        onChange={(e) => handleFilterChange(e, setSelected)}
        renderValue={(selected) =>
          selected.length === 0 ? "Filtre" : selected.join(", ")
        }
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
            },
          },
        }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          "& .MuiSelect-select": {
            padding: "2px 15px",
          },
        }}
      >
        <MenuItem value="Reset">
          <em>Reset</em>
        </MenuItem>
        {getUniqueValues(field).map((value) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={selected.includes(value)} />
            <ListItemText primary={value} />
          </MenuItem>
        ))}
      </Select>
    </TableCell>
  );

  const filteredClients = clients
    .filter(
      (client) =>
        applyFilter([client], selectedSociete, "societe_entite_clients")
          .length > 0
    )
    .filter(
      (client) =>
        applyFilter(
          [client],
          selectedSecteur,
          "secteur_activite_entite_clients"
        ).length > 0
    )
    .filter(
      (client) =>
        applyFilter([client], selectedRegion, "region_adresse_clients").length >
        0
    )
    .filter(
      (client) =>
        applyFilter([client], selectedVille, "ville_adresse_clients").length > 0
    );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{ borderBottom: `1px solid ${theme.palette.warning.main}` }}
          >
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Détails
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Société
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Secteur d'activité
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Région
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Ville
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Modifier
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Supprimer
            </TableCell>
          </TableRow>
          <TableRow
            sx={{ borderBottom: `5px solid ${theme.palette.secondary.main}` }}
          >
            <TableCell />
            {renderFilterSelect(
              "Société",
              selectedSociete,
              setSelectedSociete,
              "societe_entite_clients"
            )}
            {renderFilterSelect(
              "Secteur d'activité",
              selectedSecteur,
              setSelectedSecteur,
              "secteur_activite_entite_clients"
            )}
            {renderFilterSelect(
              "Région",
              selectedRegion,
              setSelectedRegion,
              "region_adresse_clients"
            )}
            {renderFilterSelect(
              "Ville",
              selectedVille,
              setSelectedVille,
              "ville_adresse_clients"
            )}
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow
              key={client.id_entite_clients}
              sx={{ borderBottom: `2px solid ${theme.palette.warning.main}` }}
            >
              <TableCell>
                <IconButton
                  sx={{ color: `${theme.palette.grey.dark}` }}
                  onClick={() => onClientView(client)}
                >
                  <Visibility />
                </IconButton>
              </TableCell>
              <TableCell>{client.societe_entite_clients}</TableCell>
              <TableCell>{client.secteur_activite_entite_clients}</TableCell>
              <TableCell>{client.region_adresse_clients}</TableCell>
              <TableCell>{client.ville_adresse_clients}</TableCell>
              <TableCell>
                <IconButton
                  sx={{ color: `${theme.palette.grey.dark}` }}
                  onClick={() => onClientEdit(client)}
                >
                  <Edit />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  sx={{ color: `${theme.palette.grey.dark}` }}
                  onClick={() => handleDeleteClick(client)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => handleConfirmClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmer la suppression"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer ce client ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmClose(false)} color="primary">
            Annuler
          </Button>
          <Button
            onClick={() => handleConfirmClose(true)}
            color="primary"
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ClientTable;
