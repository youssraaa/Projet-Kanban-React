# Projet Kanban – ARI 1  

Dahouane Youssra  
Master 2 MIAGE – Université de Lille  
Encadrant : Cédric Dumoulin

## Description du projet

Cette application est un tableau Kanban interactif développé en React.  Elle permet de gérer des tâches et de visualiser leur avancement dans trois colonnes : À faire, En cours, Terminé.  Chaque tâche possède un titre, une description, un statut et une date de création.  L’utilisateur peut créer, modifier, supprimer et déplacer une tâche comme dans un outil de gestion agile.

## Installation et lancement

### Cloner le projet
```
git clone https://gitlab.univ-lille.fr/youssra.dahouane.etu/ari1_dahouane_youssra_projet.git
cd ari1_dahouane_youssra_projet
```
### Installer les dépendances

Ce projet utilise React, React Router, Formik, Yup, Bootstrap, Bootstrap Icons et JSON-Server.  
Installer toutes les dépendances avec :
```
npm install
```
### Lancer le faux serveur JSON (backend)
```
npm run json-server
```
L’API sera disponible ici : http://localhost:3001/tasks

### Lancer l’application React (frontend)
Dans un nouvel onglet du terminal :
```
npm run dev
```
L’application sera accessible ici : http://localhost:5173

## Fonctionnalités implémentées

- Afficher toutes les tâches depuis le serveur (*GET /tasks*)
- Créer une tâche (*POST /tasks*)
- Modifier une tâche (*PUT /tasks/:id*)
- Supprimer une tâche (*DELETE /tasks/:id*)
- Déplacer une tâche entre les colonnes (mise à jour du statut)
- Rechercher une tâche par mot-clé
- Filtrer les tâches par statut
- Navigation entre les pages avec *React Router*
- Design responsive et pastel avec *Bootstrap*

## Démarche de développement

- J’ai d’abord développé l’application en local, avec une liste de tâches stockée dans Board.jsx afin de tester toute la logique : création, modification, suppression et déplacement entre colonnes.  
- Ensuite, j’ai intégré progressivement json-server pour rendre les tâches persistantes, en remplaçant chaque action locale par un appel API (GET, POST, PUT, DELETE).  
- Enfin, j’ai vérifié la navigation et testé chaque fonctionnalité en contrôlant régulièrement que le fichier db.json se mettait bien à jour.  
- Toutes les étapes ont été commit avec des messages clairs.

## Problèmes rencontrés et solutions

### Avant la communication avec le serveur
- *Duplication des tâches en React StrictMode*  
  Résolu avec un useRef pour empêcher un double ajout.

### Après l’intégration du serveur (json-server)
- *La modification ne mettait pas à jour db.json*  
  Corrigé en envoyant un objet complet avec PUT /tasks/:id.
- *Le déplacement d’une tâche n’était pas sauvegardé dans le serveur*  
  Ajout d’un appel PUT dans handleMove() pour enregistrer le nouveau statut.
- *La suppression fonctionnait localement mais pas dans le serveur*  
   Résolu avec DELETE /tasks/:id + mise à jour locale.
- *La mise en page n’était pas uniforme entre les pages*  
  Fixée en ajoutant .main-container pour une largeur cohérente

## Démonstration vidéo

Une démonstration complète du fonctionnement de l’application est disponible ici :
https://gitlab.univ-lille.fr/youssra.dahouane.etu/ari1_dahouane_youssra_projet/-/raw/main/Demo_Kanban.mp4?ref_type=heads
