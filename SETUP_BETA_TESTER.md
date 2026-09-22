# Procédure d’installation bêta-testeur

## Objectif

Chaque testeur obtient un environnement isolé : son propre dépôt GitHub privé et, s’il le souhaite, son propre dashboard Notion. Ne pas partager un même dépôt entre plusieurs campagnes de test.

## 1. Créer le dépôt privé

1. Créer un dépôt GitHub **privé**, par exemple `histoire-infinie-beta-nom-du-testeur`.
2. Copier tous les fichiers de ce paquet à la racine du dépôt.
3. Faire un premier commit : `Initialise beta engine`.
4. Vérifier que `main` contient les fichiers `00` à `12` et aucun état de campagne d’un autre testeur.

## 2. Configurer la campagne avec l’agent AI

1. Donner le fichier [DONNE_CECI_A_TON_AGENT_AI.md](DONNE_CECI_A_TON_AGENT_AI.md) à l’agent AI choisi.
2. Répondre à ses petites séries de questions; les détails inconnus peuvent rester `UNKNOWN`.
3. Relire son résumé et répondre `valider` seulement quand il est correct.
4. L’agent remplit alors `CAMPAIGN_SETUP.md` et initialise les fichiers canoniques.

## 3. Vérifier l’initialisation

1. Ouvrir `00_CANONICAL_GAME_STATE.md`.
2. Remplacer uniquement les champs `TEMPLATE` et `UNKNOWN` par des faits réellement choisis ou établis.
3. Compléter les vues de personnages, inventaire, quêtes et monde avec les mêmes faits.
4. Ajouter une entrée `Campaign initialization` à `08_EVENT_LEDGER.md`; l’initialisation administrative ne fait pas avancer le World Clock.
5. Faire un commit : `Initialize campaign state`.

## 4. Configurer le MJ

Donner le contenu de [BETA_MJ_INSTRUCTIONS.md](BETA_MJ_INSTRUCTIONS.md) au chat ou à l’agent qui mène la campagne. L’agent doit avoir accès au même dépôt privé.

## 5. Créer le dashboard Notion facultatif

Dans l’espace Notion personnel du testeur, créer une page `Infini-Story — Dashboard` puis les sous-pages :

- État de campagne & Canon Lock
- chaque personnage joueur et compagnon pertinent
- Inventaire & ressources
- Quêtes & lore
- Monde, lieux & factions
- Journal & règles
- Synchronisation & aides visuelles

Copier uniquement des vues lisibles des fichiers GitHub. Écrire en tête : **GitHub est la source canonique; Notion est une projection.** Ne pas recopier ou partager les liens Notion d’un autre testeur.

## 6. Exécuter la simulation obligatoire

Avant la première vraie scène, suivre [13_BETA_SIMULATION.md](13_BETA_SIMULATION.md). Le test doit se dérouler sur une branche temporaire et être supprimé à la fin. Si le test modifie `main`, le rollback n’est pas validé.

## 7. Jouer et mettre à jour

Après chaque action conséquente :

1. le MJ lit le Game State, l’Event Ledger, les règles et les vues concernées;
2. il résout l’action sans inventer de fait inconnu;
3. il met à jour tous les fichiers concernés comme un checkpoint unique;
4. il vérifie et commit GitHub;
5. il rafraîchit ensuite les seules pages Notion concernées;
6. il crée un croquis ou plateau simple seulement s’il respecte les informations révélées.

## Confidentialité et support bêta

- Ne jamais ajouter de clé API, mot de passe ou jeton dans le dépôt.
- Ne jamais créer un test à partir d’une campagne réelle sans une copie isolée.
- Un bug de continuité doit être signalé avec le commit concerné, les fichiers en conflit et la dernière version connue valide.
- Les retours peuvent être consignés dans les Issues privées du dépôt du testeur, sans publier le canon de campagne.
