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
import { Edit, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const UserTable = ({ users, onUserDelete, onUserEdit }) => {
  const theme = useTheme();
  const [selectedSociete, setSelectedSociete] = useState([]);
  const [selectedIdentifiant, setSelectedIdentifiant] = useState([]);
  const [selectedNom, setSelectedNom] = useState([]);
  const [selectedPrenom, setSelectedPrenom] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenConfirm(true);
  };

  const handleConfirmClose = (confirmed) => {
    setOpenConfirm(false);
    if (confirmed && userToDelete) {
      onUserDelete(userToDelete.id_users);
    }
    setUserToDelete(null);
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

  const filteredUsers = users
    .filter(
      (user) =>
        applyFilter([user], selectedSociete, "societe_profile").length > 0
    )
    .filter(
      (user) =>
        applyFilter([user], selectedIdentifiant, "username_users").length > 0
    )
    .filter(
      (user) => applyFilter([user], selectedNom, "nom_profile").length > 0
    )
    .filter(
      (user) => applyFilter([user], selectedPrenom, "prenom_profile").length > 0
    )
    .filter(
      (user) => applyFilter([user], selectedRole, "role_profile").length > 0
    );

  const getUniqueValues = (field) => {
    return Array.from(new Set(users.map((user) => user[field])));
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
              Société
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Identifiant
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Nom
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Prénom
            </TableCell>
            <TableCell
              sx={{
                fontFamily: theme.typography.black.fontFamily,
                fontSize: "1.2rem",
                paddingBottom: "5px",
              }}
            >
              Rôle
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
            {renderFilterSelect(
              "Société",
              selectedSociete,
              setSelectedSociete,
              "societe_profile"
            )}
            {renderFilterSelect(
              "Identifiant",
              selectedIdentifiant,
              setSelectedIdentifiant,
              "username_users"
            )}
            {renderFilterSelect(
              "Nom",
              selectedNom,
              setSelectedNom,
              "nom_profile"
            )}
            {renderFilterSelect(
              "Prénom",
              selectedPrenom,
              setSelectedPrenom,
              "prenom_profile"
            )}
            {renderFilterSelect(
              "Rôle",
              selectedRole,
              setSelectedRole,
              "role_profile"
            )}
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id_users}
              sx={{ borderBottom: `2px solid ${theme.palette.warning.main}` }}
            >
              <TableCell>{user.societe_profile}</TableCell>
              <TableCell>{user.username_users}</TableCell>
              <TableCell>{user.nom_profile}</TableCell>
              <TableCell>{user.prenom_profile}</TableCell>
              <TableCell>{user.role_profile}</TableCell>
              <TableCell>
                <IconButton
                  sx={{ color: `${theme.palette.grey.dark}` }}
                  onClick={() => onUserEdit(user)}
                >
                  <Edit />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  sx={{ color: `${theme.palette.grey.dark}` }}
                  onClick={() => handleDeleteClick(user)}
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
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
            est irréversible.
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

export default UserTable;
