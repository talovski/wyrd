import type { ApiReference5E, From5E } from "./5e-api";

export type ClassIndex =
  | "barbarian"
  | "bard"
  | "rogue"
  | "ranger"
  | "wizard"
  | "sorcerer"
  | "paladin"
  | "fighter"
  | "monk"
  | "cleric"
  | "druid"
  | "warlock";

export interface Class5E extends ApiReference5E {
  hit_die: number;
  proficiency_choices: From5E[];
  proficiencies: ApiReference5E[];
  saving_throws: ApiReference5E[];
  starting_equipment: {
    equipment: ApiReference5E[];
    quantity: number;
  };
  starting_equipment_options: From5E;
  class_levels: string;
  multi_classing: {
    prerequisites: {
      ability_score: ApiReference5E;
      minimum_score: number;
    };
  };
  spellcasting: {
    level: number;
    spellcasting_ability: ApiReference5E;
    info: {
      name: string;
      desc: string[];
    }[];
    spells: ApiReference5E[];
  };
}
