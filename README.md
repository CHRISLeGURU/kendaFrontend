# 🚗 KENDA - Mobilité Urbaine Sécurisée sur Cardano

![KENDA Banner](https://via.placeholder.com/1200x300/000000/F0B90B?text=KENDA+|+Safe+Urban+Mobility+on+Cardano)

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cardano](https://img.shields.io/badge/Cardano-Blockchain-0033AD?style=for-the-badge&logo=cardano)](https://cardano.org/)

## 📝 Introduction

**KENDA** est une Progressive Web App (PWA) révolutionnaire conçue pour résoudre les problèmes critiques de mobilité urbaine à Goma, RDC. Dans un contexte marqué par l'insécurité (enlèvements, vols) et l'informalité, KENDA apporte la confiance et la transparence grâce à une approche hybride Web2 + Web3.

Notre mission : **Garantir que chaque trajet est sûr et que chaque interaction est équitable**, en utilisant l'identité décentralisée (DID) sur Cardano pour certifier les chauffeurs et automatiser la gestion des contraventions.

---

## ✨ Fonctionnalités Clés

### 🚕 Transport & Mobilité (Passager)
-   **Commande VTC Intuitive :** Interface fluide pour commander un taxi ou une moto-taxi en quelques clics.
-   **Carte Interactive :** Visualisation en temps réel des chauffeurs et du trajet (propulsé par `React-Leaflet` & `CartoDB Dark Matter`).
-   **Estimation Transparente :** Calcul automatique du prix et du temps de trajet avant la commande.

### 🛡️ Sécurité & Confiance (Web3)
-   **Identité Certifiée (DID) :** Vérification immuable des chauffeurs via la blockchain Cardano.
-   **Panic Button (SOS) :** Bouton d'urgence partageant la localisation temps réel et les détails du chauffeur aux proches et autorités.
-   **"Trust Score" :** Système de réputation infalsifiable basé sur l'historique des trajets.

### 👮 Autorité & Régulation (Police)
-   **Contraventions Numériques :** Module pour la Police de Roulage permettant d'émettre des amendes infalsifiables liées au Wallet du chauffeur.
-   **Transparence des paiements :** Réduction de la corruption grâce à la traçabilité des fonds publics.

### 💳 Finance Décentralisée
-   **Paiements Hybrides :** Support du Mobile Money local et des crypto-monnaies (ADA/Tokens).
-   **Integration Wallet :** Connexion transparente via `MeshJS` pour la gestion des actifs.

---

## 🛠️ Stack Technique

Ce projet a été construit avec les technologies les plus modernes pour assurer performance, accessibilité et sécurité.

-   **Frontend :** [Next.js 14](https://nextjs.org/) (App Router) - Framework React de production.
-   **Langage :** [TypeScript](https://www.typescriptlang.org/) - Typage statique pour un code robuste.
-   **Design System :**
    -   [TailwindCSS](https://tailwindcss.com/) - Styling utilitaire performant.
    -   [Shadcn/UI](https://ui.shadcn.com/) - Composants accessibles et personnalisables.
    -   [Lucide React](https://lucide.dev/) - Icônes vectorielles légères.
-   **Cartographie :** [React-Leaflet](https://react-leaflet.js.org/) & Tiles OpenStreetMap/CartoDB.
-   **Blockchain :** [MeshJS](https://meshjs.dev/) - SDK complet pour l'interaction avec Cardano.

---

## 🚀 Installation & Démarrage

Suivez ces instructions pour lancer le projet en local pour le développement ou la démonstration.

### Prérequis
-   Node.js 18+ installé.
-   Un gestionnaire de paquets (npm, yarn ou pnpm).

### Commandes

```bash
# 1. Cloner le dépôt
git clone https://github.com/TITAN-CARADANO-TEAM/kendaFrontend.git

# 2. Accéder au dossier
cd kendaFrontend

# 3. Installer les dépendances
npm install

# 4. Configurer les variables d'environnement
# Copiez le fichier d'exemple et remplissez les valeurs nécessaires (API Keys, etc.)
cp .env.example .env.local

# 5. Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

---

## 📂 Structure du Projet

Voici un aperçu de l'organisation du code source :

```ascii
src/
├── app/                  # Routes Next.js (App Router)
│   ├── layout.tsx        # Layout global (Sidebar, Fontes)
│   ├── page.tsx          # Page d'accueil (Landing)
│   ├── map/              # Vue principale (Carte)
│   ├── auth/             # Login/Inscription
│   └── wallet/           # Interface Portefeuille
├── components/           # Composants Réutilisables
│   ├── ui/               # Primitives UI (Boutons, Cards...)
│   ├── map/              # Composants Cartographiques (Leaflet)
│   ├── ride/             # Logique de trajet (Request, Rating, SOS)
│   ├── layout/           # Sidebar, Navbar, Header
│   └── auth/             # Formulaires d'authentification
├── lib/                  # Utilitaires & Hooks
└── public/               # Assets statiques (Images, Icons)
```

---

## 👥 L'Équipe Titan

Une équipe passionnée dédiée à l'innovation technologique en Afrique.

| Rôle | Membre | Responsabilités |
| :--- | :--- | :--- |
| **Team Lead Frontend** | **Peter** | Architecture Globale, Map Integration, Core Logic. |
| **Ride Logic** | **Kévin & Anderson** | Algorithmes de matching, Flux VTC, États de course. |
| **UI & Profil** | **Dieu** | Design System, Expérience Utilisateur, Dashboard. |
| **Module Police** | **Dek & Chris** | Logique de contraventions, Interface Autorité. |
| **Documentation** | **Joël** | Rédaction technique, Présentation, Pitch. |

---

<div align="center">
  <p>Développé avec ❤️ à Goma pour le Hackathon <strong>ADA PRISMA</strong>.</p>
  <p>© 2025 KENDA Project.</p>
</div>
