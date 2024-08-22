import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, useTheme } from "@mui/material";
import ClientTable from "../components/ClientTable";
import ClientFormModal from "../components/ClientFormModal";
import ClientDetailModal from "../components/ClientDetailModal";
import Header from "../components/Header";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

const ClientManagementPage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [filters, setFilters] = useState({
    societe_entite_clients: [],
    secteur_activite_entite_clients: [],
    region_adresse_clients: [],
    ville_adresse_clients: [],
  });
  const theme = useTheme();

  const fetchClients = () => {
    axios
      .get("http://localhost:5001/api/clients", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const sortedClients = response.data.sort((a, b) =>
          a.societe_entite_clients.localeCompare(b.societe_entite_clients)
        );
        setClients(sortedClients);
        setFilteredClients(sortedClients);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleFilterChange = (column, values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: values,
    }));
  };

  useEffect(() => {
    let filtered = clients;

    Object.keys(filters).forEach((column) => {
      if (filters[column].length > 0) {
        filtered = filtered.filter((client) =>
          filters[column].includes(client[column])
        );
      }
    });

    setFilteredClients(filtered);
  }, [filters, clients]);

  const handleAddClient = (newClient) => {
    setModalOpen(false);
    fetchClients();
  };

  const handleUpdateClient = (updatedClient) => {
    setModalOpen(false);
    fetchClients();
  };

  const handleDelete = (id_entite_clients) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:5001/api/clients/${id_entite_clients}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(() => {
        setClients(
          clients.filter(
            (client) => client.id_entite_clients !== id_entite_clients
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting client:", error);
      });
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  const handleViewClient = (client) => {
    setViewingClient(client);
  };

  const handleCloseModal = () => {
    setEditingClient(null);
    setModalOpen(false);
  };

  const handleCloseDetailModal = () => {
    setViewingClient(null);
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
          Fichier clients
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
            <ClientTable
              clients={filteredClients}
              onClientDelete={handleDelete}
              onClientEdit={handleEditClient}
              onClientView={handleViewClient}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </Box>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingClient(null);
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
          Ajouter un client
        </Button>
        <ClientFormModal
          open={modalOpen}
          onClose={handleCloseModal}
          onAddClient={handleAddClient}
          onUpdateClient={handleUpdateClient}
          editingClient={editingClient}
        />
        {viewingClient && (
          <ClientDetailModal
            open={Boolean(viewingClient)}
            onClose={handleCloseDetailModal}
            client={viewingClient}
          />
        )}
      </Box>
    </Box>
  );
};

export default ClientManagementPage;
