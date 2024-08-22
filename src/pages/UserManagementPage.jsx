import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, useTheme } from "@mui/material";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";
import Header from "../components/Header";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({
    societe_profile: [],
    username_users: [],
    nom_profile: [],
    prenom_profile: [],
    role_profile: [],
  });
  const theme = useTheme();

  const fetchUsers = () => {
    axios
      .get("http://localhost:5001/api/users", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) =>
          a.nom_profile.localeCompare(b.nom_profile)
        );
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (column, values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: values,
    }));
  };

  useEffect(() => {
    let filtered = users;

    Object.keys(filters).forEach((column) => {
      if (filters[column].length > 0) {
        filtered = filtered.filter((user) =>
          filters[column].includes(user[column])
        );
      }
    });

    setFilteredUsers(filtered);
  }, [filters, users]);

  const handleAddUser = (newUser) => {
    setModalOpen(false);
    fetchUsers();
  };

  const handleUpdateUser = (updatedUser) => {
    setModalOpen(false);
    fetchUsers();
  };

  const handleDelete = (id_users) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:5001/api/users/${id_users}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user.id_users !== id_users));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(150deg, #FFFFFF 5%, #EEC3A3 27%, #EAA56D 86%, #E56B01 99%)",
        minHeight: "100vh",
        width: "100%",
        padding: "10px",
        position: "relative",
        boxSizing: "border-box",
        [theme.breakpoints.down("sm")]: {
          padding: "5px",
        },
      }}
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "10px",
          marginLeft: { lg: "250px", xs: "0" },
          padding: { xs: "0 5px", sm: "0 10px" },
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "10px",
            marginLeft: "10px",
            fontFamily: theme.typography.medium.fontFamily,
            [theme.breakpoints.down("sm")]: {
              marginLeft: "5px",
              marginBottom: "5px",
              fontSize: "1.5rem",
            },
          }}
        >
          Gestion des utilisateurs
        </Typography>
        <Paper
          sx={{
            padding: "10px",
            margin: "0 10px 20px 10px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            height: "calc(100vh - 150px)",
            width: "calc(100% - 20px)",
            maxWidth: "100%",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
              height: "calc(100vh - 150px)",
              width: "calc(100% - 10px)",
              padding: "10px",
            },
          }}
        >
          <Box sx={{ maxHeight: "100%", overflowY: "auto" }}>
            <UserTable
              users={filteredUsers}
              onUserDelete={handleDelete}
              onUserEdit={handleEditUser}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Box>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingUser(null);
            setModalOpen(true);
          }}
          startIcon={<AddIcon />}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "30px",
            zIndex: 1000,
            [theme.breakpoints.down("sm")]: {
              bottom: "10px",
              right: "10px",
            },
          }}
        >
          Ajouter un utilisateur
        </Button>
        <UserFormModal
          open={modalOpen}
          onClose={handleCloseModal}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          editingUser={editingUser}
        />
      </Box>
    </Box>
  );
};

export default UserManagementPage;
