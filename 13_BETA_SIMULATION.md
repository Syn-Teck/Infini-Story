# Simulation bêta obligatoire

## But

Prouver que le testeur peut appliquer puis annuler un checkpoint sans toucher à `main`.

## Procédure

1. Créer une branche temporaire : `simulation-checkpoint-test`.
2. Choisir une ressource fictive explicitement disponible, par exemple une flèche ou une charge.
3. Modifier en cohérence le Game State, la vue du personnage, l’inventaire et l’Event Ledger. Marquer chaque changement **SIMULATION ONLY — not canonical gameplay**.
4. Commit et pousser la branche temporaire.
5. Rafraîchir seulement les vues Notion correspondantes et vérifier les nouvelles valeurs.
6. Si souhaité, générer un croquis non tactique de la scène déjà révélée.
7. Restaurer exactement les pages Notion concernées.
8. Revenir sur `main`, vérifier les valeurs initiales et le World Clock.
9. Supprimer la branche temporaire sur GitHub et localement, sans merge.

## Critères de réussite

- `main` ne contient aucune ligne de simulation.
- Le World Clock, l’Event Ledger canonique et les personnages réels restent inchangés sur `main`.
- Les vues Notion sont restaurées.
- La branche temporaire n’existe plus.
