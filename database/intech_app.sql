-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 22 août 2024 à 22:05
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `intech_app`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse_clients`
--

CREATE TABLE `adresse_clients` (
  `id_adresse_clients` int(11) NOT NULL,
  `id_entite_clients` int(11) DEFAULT NULL,
  `pays_adresse_clients` varchar(100) DEFAULT NULL,
  `region_adresse_clients` varchar(100) DEFAULT NULL,
  `ville_adresse_clients` varchar(100) DEFAULT NULL,
  `code_postal_adresse_clients` varchar(20) DEFAULT NULL,
  `voie_adresse_clients` varchar(255) DEFAULT NULL,
  `numero_adresse_clients` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `contact_clients`
--

CREATE TABLE `contact_clients` (
  `id_contact_clients` int(11) NOT NULL,
  `id_entite_clients` int(11) DEFAULT NULL,
  `id_adresse_clients` int(11) DEFAULT NULL,
  `nom_contact_clients` varchar(255) DEFAULT NULL,
  `prenom_contact_clients` varchar(255) DEFAULT NULL,
  `poste_contact_clients` varchar(255) DEFAULT NULL,
  `email_contact_clients` varchar(255) DEFAULT NULL,
  `tel_contact_clients` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `entite_clients`
--

CREATE TABLE `entite_clients` (
  `id_entite_clients` int(11) NOT NULL,
  `societe_entite_clients` varchar(255) NOT NULL,
  `secteur_activite_entite_clients` varchar(255) DEFAULT NULL,
  `sites_entite_clients` text,
  `tel_entite_clients` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

CREATE TABLE `profile` (
  `id_profile` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `societe_profile` varchar(100) NOT NULL,
  `nom_profile` varchar(100) NOT NULL,
  `prenom_profile` varchar(100) NOT NULL,
  `role_profile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username_users` varchar(100) NOT NULL,
  `password_users` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `adresse_clients`
--
ALTER TABLE `adresse_clients`
  ADD PRIMARY KEY (`id_adresse_clients`),
  ADD KEY `id_entite_clients` (`id_entite_clients`);

--
-- Index pour la table `contact_clients`
--
ALTER TABLE `contact_clients`
  ADD PRIMARY KEY (`id_contact_clients`),
  ADD KEY `id_entite_clients` (`id_entite_clients`),
  ADD KEY `id_adresse_clients` (`id_adresse_clients`);

--
-- Index pour la table `entite_clients`
--
ALTER TABLE `entite_clients`
  ADD PRIMARY KEY (`id_entite_clients`);

--
-- Index pour la table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id_profile`),
  ADD KEY `profile_ibfk_1` (`id_users`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `adresse_clients`
--
ALTER TABLE `adresse_clients`
  MODIFY `id_adresse_clients` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `contact_clients`
--
ALTER TABLE `contact_clients`
  MODIFY `id_contact_clients` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `entite_clients`
--
ALTER TABLE `entite_clients`
  MODIFY `id_entite_clients` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profile`
--
ALTER TABLE `profile`
  MODIFY `id_profile` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `adresse_clients`
--
ALTER TABLE `adresse_clients`
  ADD CONSTRAINT `adresse_clients_ibfk_1` FOREIGN KEY (`id_entite_clients`) REFERENCES `entite_clients` (`id_entite_clients`);

--
-- Contraintes pour la table `contact_clients`
--
ALTER TABLE `contact_clients`
  ADD CONSTRAINT `contact_clients_ibfk_1` FOREIGN KEY (`id_entite_clients`) REFERENCES `entite_clients` (`id_entite_clients`),
  ADD CONSTRAINT `contact_clients_ibfk_2` FOREIGN KEY (`id_adresse_clients`) REFERENCES `adresse_clients` (`id_adresse_clients`);

--
-- Contraintes pour la table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
