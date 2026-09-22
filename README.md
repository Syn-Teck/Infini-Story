# Infini-Story — Engine V1

Un moteur de campagne persistant : GitHub privé est le canon, Notion est la vue de consultation, et le MJ applique les checkpoints de manière cohérente.

Cette V1 dérive du template `Beta-Test-Histoire-Infinie`. Elle ajoute une spécification d'engine générique et reste volontairement distincte de toute campagne, personnage, secret, image ou événement particulier.

## Inclus

- Canon Lock, état canonique, Event Ledger et règles de continuité;
- vues de personnages, inventaire, quêtes, monde, factions et relations;
- protocole de mise à jour GitHub → Notion;
- procédure de simulation et rollback;
- règles pour les croquis d’ambiance et plateaux tactiques légers.
- contrats V1 pour les jets, états de combat, ressources, connaissances PNJ et checkpoints;
- checklist de validation et protocole de migration de l'engine.

## Exclu volontairement

Ce paquet ne contient aucune donnée de la campagne originale, aucun personnage, lore, lien Notion, identifiant, jeton ou fichier de vérification issu du dépôt source.

Il ne contient pas non plus de données provenant d'une campagne de test ou de notes d'incident : les concepts réutilisables ont été généralisés dans `ENGINE_V1_OVERVIEW.md` et `engine/`.

## Engine V1

Lire dans cet ordre avant de concevoir ou implémenter un adaptateur :

1. [Vue d'ensemble V1](ENGINE_V1_OVERVIEW.md)
2. [Contrats de données](engine/01_DATA_CONTRACTS.md)
3. [Protocole de résolution](engine/02_RESOLUTION_PROTOCOL.md)
4. [Checklist QA engine](engine/03_ENGINE_QA.md)
5. [Migration et versioning](engine/04_MIGRATION_AND_VERSIONING.md)

Les spécifications détaillées `engine/05` à `engine/16` couvrent les dés, le combat, les ressources, les connaissances, la validation d'état, les événements, le rollback, les adapters de système, la concurrence, la confidentialité, l'observabilité et les tests de non-régression.

## Démarrage

Le testeur donne d’abord [DONNE_CECI_A_TON_AGENT_AI.md](DONNE_CECI_A_TON_AGENT_AI.md) à son agent AI. L’agent pose les questions simplement, remplit `CAMPAIGN_SETUP.md` après validation, puis initialise le canon. La procédure technique complète est dans [SETUP_BETA_TESTER.md](SETUP_BETA_TESTER.md).

## Prototype PWA

Le dossier `pwa/` contient la première interface mobile d’Infini-Story. Cette étape autonome permet de tester la narration, les actions, les jets transparents, la fiche de personnage, l’inventaire, le journal et la lecture à voix haute offerte par le navigateur.

Le prototype fonctionne avec des données de démonstration locales. Il ne lit ni ne modifie le canon, ne lance aucune campagne et n’avance aucun World Clock.

La vue **Sauvegardes** permet d’exporter le journal de démonstration dans un fichier JSON restaurable et de réimporter ce même format après validation locale. Après connexion Microsoft, elle peut aussi synchroniser la sauvegarde de démonstration vers le coffre SharePoint attribué. Cette fonction ne téléverse aucune donnée canonique.

Pour le démarrer :

```powershell
cd pwa
pnpm install
pnpm dev
```

Le backend, le validateur canonique et l’adaptateur d’IA seront ajoutés dans une étape séparée. Aucune clé d’API ne doit être placée dans la PWA.

La configuration d'installation et de publication de la PWA est documentée dans [pwa/DEPLOYMENT.md](pwa/DEPLOYMENT.md). Elle inclut le mode de déploiement à la racine d'un domaine ou sous un sous-dossier, ainsi que la vérification mobile et hors ligne.

## Publication GitHub Pages

Le workflow [deploy-pages.yml](.github/workflows/deploy-pages.yml) construit et publie automatiquement `pwa/dist/` à chaque envoi sur `main`. Dans les réglages GitHub du dépôt, choisir **Settings → Pages → Source: GitHub Actions** une seule fois. GitHub fournira alors l'adresse publique de l'application.
