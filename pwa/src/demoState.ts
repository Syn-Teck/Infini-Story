import type { CharacterSummary, StoryMessage } from "./types";

export const demoCharacter: CharacterSummary = {
  name: "Personnage",
  archetype: "Profil de démonstration",
  hp: { current: 16, maximum: 20 },
  defense: 14,
  resources: [
    { name: "Énergie", current: 3, maximum: 4 },
    { name: "Chance", current: 1, maximum: 1 },
  ],
};

export const initialMessages: StoryMessage[] = [
  {
    id: "system-welcome",
    role: "system",
    content: "Prototype local — aucune campagne canonique n’est chargée et aucun World Clock n’avance.",
    timestamp: "Maintenant",
  },
  {
    id: "gm-welcome",
    role: "gm",
    content:
      "Bienvenue dans Infini-Story. Cette première interface permet de tester la lecture, les actions et les jets transparents. Le moteur canonique et l’IA seront reliés dans une prochaine étape contrôlée.",
    timestamp: "Maintenant",
  },
];

export const demoInventory = [
  { name: "Sac d’aventure", detail: "Équipement de démonstration", quantity: 1 },
  { name: "Rations", detail: "Valeur non canonique", quantity: 3 },
  { name: "Torche", detail: "Valeur non canonique", quantity: 2 },
];
