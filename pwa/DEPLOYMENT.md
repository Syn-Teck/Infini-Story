# Déploiement de la PWA Infini-Story

## Ce qui est prêt

La PWA est une interface mobile autonome. Elle propose une histoire de démonstration, des jets transparents, une fiche et un inventaire fictifs, une lecture à voix haute du navigateur, un manifeste d'installation et un cache hors ligne du shell de l'application.

Elle ne reçoit aucune clé API, ne contacte aucun modèle d'IA, ne lit aucun dépôt GitHub et ne peut pas modifier le canon d'une campagne. Son stockage local sert uniquement à conserver le fil de démonstration de ce navigateur.

## Coffret SharePoint

La section **Sauvegardes** peut connecter un compte Microsoft de l'organisation Syn-Teck et utiliser le dossier de coffre attribué. La connexion emploie Microsoft Entra et Microsoft Graph avec une permission déléguée : le compte connecté ne peut accéder qu'aux fichiers auxquels il possède déjà des droits SharePoint.

- L'identifiant client Entra est inclus dans le code de la PWA : il est public par conception et n'est pas un secret.
- Aucun mot de passe, jeton permanent ou secret client n'est placé dans GitHub Pages.
- La version actuelle cible `Aventures/SynikWulf/infini-story-demo.json` et met à jour ce même fichier à chaque sauvegarde cloud.
- Ce fichier reste une sauvegarde de démonstration hors canon. Une sauvegarde cloud ne lance pas une campagne et ne modifie pas le World Clock.

Pour ajouter un nouvel utilisateur à l'avenir, créer son dossier d'aventure SharePoint et lui attribuer les droits nécessaires avant de l'associer dans l'application. La gestion automatisée de plusieurs comptes sera une étape distincte.

## Préparer une version de production

Depuis le dossier `pwa/` :

```powershell
pnpm install --frozen-lockfile
pnpm run build
```

Publier ensuite le contenu de `pwa/dist/` sur un hébergeur HTTPS. HTTPS est nécessaire pour que l'installation et le cache hors ligne soient disponibles hors de `localhost`.

## Adresse de publication

Par défaut, la PWA suppose qu'elle sera publiée à la racine d'un domaine, par exemple `https://app.exemple.ca/`.

Si elle est publiée sous un sous-dossier, définir `VITE_BASE_PATH` avant la construction. Le chemin doit commencer et finir par `/` :

```powershell
$env:VITE_BASE_PATH = "/infini-story/"
pnpm run build
```

Le manifeste, l'icône et le service hors ligne suivront alors ce sous-dossier.

## Vérification après publication

1. Ouvrir l'adresse HTTPS sur téléphone et ordinateur.
2. Vérifier que l'option d'installation est proposée par le navigateur.
3. Lancer l'application installée, puis tester une action de démonstration et la lecture à voix haute.
4. Recharger une fois l'application, couper temporairement le réseau puis la rouvrir pour confirmer que le shell est disponible hors ligne.
5. Vérifier que l'indicateur reste `Hors canon` et qu'aucune donnée de campagne n'est présente.

L'étape suivante, distincte de cette PWA, est un backend privé avec validation canonique et adaptateur d'IA. Il ne doit être branché qu'après une décision explicite sur l'hébergement et le protocole canonique de sauvegarde.
