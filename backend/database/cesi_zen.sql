-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 03 jan. 2025 à 10:28
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cesi_zen`
--

-- --------------------------------------------------------

--
-- Structure de la table `activites_de_detente`
--

CREATE TABLE `activites_de_detente` (
  `id_activite` int(11) NOT NULL,
  `nom_activite` varchar(50) NOT NULL,
  `description_activite` text NOT NULL,
  `status_activite` varchar(50) NOT NULL,
  `id_categorie` int(11) NOT NULL
) ;

--
-- Déchargement des données de la table `activites_de_detente`
--

INSERT INTO `activites_de_detente` (`id_activite`, `nom_activite`, `description_activite`, `status_activite`, `id_categorie`) VALUES
(1, 'Coloriage Mandala Relaxant', '', 'Disponible', 1),
(2, 'Étirements matinaux doux', '', 'Disponible', 2),
(3, 'Méditation guidée pour le sommeil', '', 'Disponible', 3),
(4, 'Relaxation sonore - Bruits de pluie', '', 'Disponible', 4),
(5, 'Peinture intuitive', '', 'Disponible', 5);

-- --------------------------------------------------------

--
-- Structure de la table `beneficier_de`
--

CREATE TABLE `beneficier_de` (
  `id_utilisateur` int(11) NOT NULL,
  `id_emotion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `categories_activites`
--

CREATE TABLE `categories_activites` (
  `id_categorie` int(11) NOT NULL,
  `nom_categorie` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categories_activites`
--

INSERT INTO `categories_activites` (`id_categorie`, `nom_categorie`) VALUES
(1, 'Mandalas'),
(2, 'Étirements Doux'),
(3, 'Méditations'),
(4, 'Relaxation Sonore'),
(5, 'Activités Expressives');

-- --------------------------------------------------------

--
-- Structure de la table `configuration_emotions`
--

CREATE TABLE `configuration_emotions` (
  `id_configuration` int(11) NOT NULL,
  `nom_emotion` varchar(50) NOT NULL,
  `categorie_emotion` varchar(50) NOT NULL,
  `image_emotion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `configuration_emotions`
--

INSERT INTO `configuration_emotions` (`id_configuration`, `nom_emotion`, `categorie_emotion`, `image_emotion`) VALUES
(1, 'Joie', 'Positive', '/images/emotions/joie.png'),
(2, 'Amour', 'Positive', NULL),
(3, 'Gratitude', 'Positive', NULL),
(4, 'Sérénité', 'Positive', NULL),
(5, 'Espoir', 'Positive', NULL),
(6, 'Tristesse', 'Négative', '/images/emotions/tristesse.png'),
(7, 'Colère', 'Négative', '/images/emotions/colère.png'),
(8, 'Peur', 'Négative', '/images/emotions/peur.png'),
(9, 'Dégoût', 'Négative', NULL),
(10, 'Culpabilité', 'Négative', NULL),
(11, 'Fierté', 'Positive', NULL),
(12, 'Stress', 'Négative', NULL),
(13, 'Compassion', 'Positive', NULL),
(14, 'Soulagement', 'Positive', NULL),
(15, 'Honte', 'Négative', NULL),
(16, 'Allégresse', 'Positive', NULL),
(17, 'Apaisement', 'Positive', NULL),
(18, 'Contentement', 'Positive', NULL),
(19, 'Euphorie', 'Positive', NULL),
(20, 'Sérénité', 'Positive', NULL),
(21, 'Détresse', 'Négative', NULL),
(22, 'Amertume', 'Négative', NULL),
(23, 'Culpabilité', 'Négative', NULL),
(24, 'Frustration', 'Négative', NULL),
(25, 'Inquiétude', 'Négative', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `consulte`
--

CREATE TABLE `consulte` (
  `id_utilisateur` int(11) NOT NULL,
  `id_information` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `diagnostic`
--

CREATE TABLE `diagnostic` (
  `id_diagnostic` int(11) NOT NULL,
  `nom_questionnaire` varchar(50) NOT NULL,
  `questions` text NOT NULL,
  `resultats` text DEFAULT NULL,
  `auteur` int(11) NOT NULL,
  `utilisateur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `effectue`
--

CREATE TABLE `effectue` (
  `id_utilisateur` int(11) NOT NULL,
  `id_activite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `exercices_de_respirations`
--

CREATE TABLE `exercices_de_respirations` (
  `id_exercice` int(11) NOT NULL,
  `nom_exercice` varchar(50) NOT NULL,
  `description_exercice` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `favori`
--

CREATE TABLE `favori` (
  `id_favori` int(11) NOT NULL,
  `type_favori` varchar(50) NOT NULL,
  `id_activite` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `information`
--

CREATE TABLE `information` (
  `id_information` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `auteur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `possède`
--

CREATE TABLE `possède` (
  `id_utilisateur` int(11) NOT NULL,
  `id_favori` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `pratique`
--

CREATE TABLE `pratique` (
  `id_utilisateur` int(11) NOT NULL,
  `id_exercice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tracker_emotions`
--

CREATE TABLE `tracker_emotions` (
  `id_emotion` int(11) NOT NULL,
  `type_emotion` varchar(50) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date_emotion` date NOT NULL,
  `id_configuration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id_utilisateur` int(11) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `statut_compte` varchar(50) DEFAULT 'valide',
  `pseudo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `prenom`, `nom`, `email`, `mot_de_passe`, `statut_compte`, `pseudo`) VALUES
(1, 'ddd', 'dddd', 'doe@example.com', '$2a$08$YhAvz/pB3WnYedc/a8tKyu8oiOo3M1d4eO8WpODfBBjF1N97tO.pu', 'valide', 'miohuyghlmkljihkuyi'),
(6, 'Hélène', 'Poirier-Halley', 'heloceinlove@laposte.net', '$2a$08$/rh5bAk3xR08fyON1tKRB.a6ps4oB8r/3l9FWCCaSZbAjamPvKGla', 'valide', 'LNwarrior'),
(7, 'tg', 'tg', 'wattsans@wat.wat', '$2a$08$nuvZW81L4JSAjiVY4YtlP.42hliWaS4Ql66bk7BGoRb.UCUoujmrW', 'valide', 'tf&');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activites_de_detente`
--
ALTER TABLE `activites_de_detente`
  ADD PRIMARY KEY (`id_activite`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `beneficier_de`
--
ALTER TABLE `beneficier_de`
  ADD PRIMARY KEY (`id_utilisateur`,`id_emotion`),
  ADD KEY `id_emotion` (`id_emotion`);

--
-- Index pour la table `categories_activites`
--
ALTER TABLE `categories_activites`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `configuration_emotions`
--
ALTER TABLE `configuration_emotions`
  ADD PRIMARY KEY (`id_configuration`);

--
-- Index pour la table `consulte`
--
ALTER TABLE `consulte`
  ADD PRIMARY KEY (`id_utilisateur`,`id_information`),
  ADD KEY `id_information` (`id_information`);

--
-- Index pour la table `diagnostic`
--
ALTER TABLE `diagnostic`
  ADD PRIMARY KEY (`id_diagnostic`),
  ADD KEY `auteur` (`auteur`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `effectue`
--
ALTER TABLE `effectue`
  ADD PRIMARY KEY (`id_utilisateur`,`id_activite`),
  ADD KEY `id_activite` (`id_activite`);

--
-- Index pour la table `exercices_de_respirations`
--
ALTER TABLE `exercices_de_respirations`
  ADD PRIMARY KEY (`id_exercice`);

--
-- Index pour la table `favori`
--
ALTER TABLE `favori`
  ADD PRIMARY KEY (`id_favori`),
  ADD KEY `id_activite` (`id_activite`),
  ADD KEY `id_exercice` (`id_exercice`);

--
-- Index pour la table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id_information`),
  ADD KEY `auteur` (`auteur`);

--
-- Index pour la table `possède`
--
ALTER TABLE `possède`
  ADD PRIMARY KEY (`id_utilisateur`,`id_favori`),
  ADD KEY `id_favori` (`id_favori`);

--
-- Index pour la table `pratique`
--
ALTER TABLE `pratique`
  ADD PRIMARY KEY (`id_utilisateur`,`id_exercice`),
  ADD KEY `id_exercice` (`id_exercice`);

--
-- Index pour la table `tracker_emotions`
--
ALTER TABLE `tracker_emotions`
  ADD PRIMARY KEY (`id_emotion`),
  ADD KEY `id_configuration` (`id_configuration`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activites_de_detente`
--
ALTER TABLE `activites_de_detente`
  MODIFY `id_activite` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories_activites`
--
ALTER TABLE `categories_activites`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `configuration_emotions`
--
ALTER TABLE `configuration_emotions`
  MODIFY `id_configuration` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `diagnostic`
--
ALTER TABLE `diagnostic`
  MODIFY `id_diagnostic` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `exercices_de_respirations`
--
ALTER TABLE `exercices_de_respirations`
  MODIFY `id_exercice` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `favori`
--
ALTER TABLE `favori`
  MODIFY `id_favori` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `information`
--
ALTER TABLE `information`
  MODIFY `id_information` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tracker_emotions`
--
ALTER TABLE `tracker_emotions`
  MODIFY `id_emotion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `activites_de_detente`
--
ALTER TABLE `activites_de_detente`
  ADD CONSTRAINT `activites_de_detente_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories_activites` (`id_categorie`);

--
-- Contraintes pour la table `beneficier_de`
--
ALTER TABLE `beneficier_de`
  ADD CONSTRAINT `beneficier_de_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `beneficier_de_ibfk_2` FOREIGN KEY (`id_emotion`) REFERENCES `tracker_emotions` (`id_emotion`);

--
-- Contraintes pour la table `consulte`
--
ALTER TABLE `consulte`
  ADD CONSTRAINT `consulte_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `consulte_ibfk_2` FOREIGN KEY (`id_information`) REFERENCES `information` (`id_information`);

--
-- Contraintes pour la table `diagnostic`
--
ALTER TABLE `diagnostic`
  ADD CONSTRAINT `diagnostic_ibfk_1` FOREIGN KEY (`auteur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `diagnostic_ibfk_2` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `effectue`
--
ALTER TABLE `effectue`
  ADD CONSTRAINT `effectue_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `effectue_ibfk_2` FOREIGN KEY (`id_activite`) REFERENCES `activites_de_detente` (`id_activite`);

--
-- Contraintes pour la table `favori`
--
ALTER TABLE `favori`
  ADD CONSTRAINT `favori_ibfk_1` FOREIGN KEY (`id_activite`) REFERENCES `activites_de_detente` (`id_activite`),
  ADD CONSTRAINT `favori_ibfk_2` FOREIGN KEY (`id_exercice`) REFERENCES `exercices_de_respirations` (`id_exercice`);

--
-- Contraintes pour la table `information`
--
ALTER TABLE `information`
  ADD CONSTRAINT `information_ibfk_1` FOREIGN KEY (`auteur`) REFERENCES `utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `possède`
--
ALTER TABLE `possède`
  ADD CONSTRAINT `possède_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `possède_ibfk_2` FOREIGN KEY (`id_favori`) REFERENCES `favori` (`id_favori`);

--
-- Contraintes pour la table `pratique`
--
ALTER TABLE `pratique`
  ADD CONSTRAINT `pratique_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pratique_ibfk_2` FOREIGN KEY (`id_exercice`) REFERENCES `exercices_de_respirations` (`id_exercice`);

--
-- Contraintes pour la table `tracker_emotions`
--
ALTER TABLE `tracker_emotions`
  ADD CONSTRAINT `tracker_emotions_ibfk_1` FOREIGN KEY (`id_configuration`) REFERENCES `configuration_emotions` (`id_configuration`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
