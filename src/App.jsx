import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserManagementPage from "./pages/UserManagementPage";
import ClientManagementPage from "./pages/ClientManagementPage";
import PrivateRoute from "./components/PrivateRoute"; // Importez PrivateRoute

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/homepage" element={<HomePage />} />{" "}
      {/* Pas de PrivateRoute ici */}
      <Route
        path="/user-management"
        element={<PrivateRoute element={UserManagementPage} />}
      />
      <Route
        path="/client-management"
        element={<PrivateRoute element={ClientManagementPage} />}
      />
    </Routes>
  );
}

export default App;
