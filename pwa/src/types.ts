export type MessageRole = "system" | "gm" | "player" | "roll";

export interface RollResult {
  formula: string;
  natural: number;
  modifier: number;
  total: number;
  target: number;
  outcome: "Réussite" | "Échec";
}

export interface StoryMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  roll?: RollResult;
}

export interface CharacterSummary {
  name: string;
  archetype: string;
  hp: { current: number; maximum: number };
  defense: number;
  resources: Array<{ name: string; current: number; maximum: number }>;
}

export type ViewName = "story" | "character" | "inventory" | "journal";
