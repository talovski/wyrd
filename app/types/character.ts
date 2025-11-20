import type { ApiReference5E, From5E } from "./5e/5e-api";
import type { ClassIndex } from "./5e/class";

export type AbilityScore = "dex" | "str" | "wis" | "int" | "cha" | "con";

export interface CharacterType {
  name: string;
  level: number;
  class: ClassIndex | null;
  ability_scores: Record<AbilityScore, number>;
  hit_die: number;
  armor_class: number;
  armor_class_mod: number;
  speed: number;
  race: string;
  skills: string[];
  armor: string[];
  weapons: string[];
  saving_throws: ApiReference5E[];
  proficiencies: ApiReference5E[];
  proficiencie_choices: From5E[];
}
