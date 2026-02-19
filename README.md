# Projet réalisé dans le cadre de RT0907(Programmation cloud )

# Ce projet met en place une solution complète de vote basée sur une architecture **Serverless AWS**, avec un frontend React déployé sur Vercel.

# Compte de test utilisateur : test2@gmail.com , mdp : 5dNNef@yALYTUQK

# Compte de test utilisateur admin : admin@admin.com , mdp : 5dNNef@yALYTUQK

# Le backend a été réalisé en AWS Lambda,

# Le frontend :

https://vote-self.vercel.app

# L’application repose sur les services suivants :

- **AWS Lambda** – Fonctions serverless
- **Amazon API Gateway (HTTP API)** – Exposition des endpoints REST
- **Amazon DynamoDB** – Stockage NoSQL
- **Amazon S3** – Stockage des documents de campagne
- **Amazon Cognito** – Authentification & gestion des rôles
- **Terraform** – Infrastructure as Code
- **React (Vite)** – Frontend
- **Vercel** – Déploiement frontend

# Fonctionnalités

## Utilisateur

- Authentification sécurisée via Cognito
- Consultation des candidats
- Vote (unicité garantie côté backend)
- Visualisation des résultats (diagramme circulaire)
- Consultation des documents de campagne

## Administrateur

- Ajout de candidat
- Dépôt de document de campagne
- Accès protégé via groupe Cognito `admin`
