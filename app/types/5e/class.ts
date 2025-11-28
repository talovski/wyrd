import type { ApiReference5E } from "./5e-api";
import type { Level5E } from "./level";

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
  proficiency_choices: {
    desc: string;
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      options: {
        option_type: string;
        item?: ApiReference5E;
        choice?: {
          desc: string;
          choose: number;
          type: string;
          from: {
            option_set_type: string;
            options: {
              option_type: string;
              item: ApiReference5E;
            }[];
          };
        };
      }[];
    };
  }[];
  proficiencies: ApiReference5E[];
  saving_throws: ApiReference5E[];
  starting_equipment: {
    equipment?: ApiReference5E;
    quantity?: number;
  }[];
  starting_equipment_options: {
    desc: string;
    choose: number;
    type: string;
    from: {
      option_set_type: string;
      equipment_category?: ApiReference5E;
      options?: {
        option_type?: string;
        count?: number;
        of?: ApiReference5E;
        prerequisites?: {
          type: string;
          proficiency: {
            name: string;
            url: string;
          };
        }[];
        choice?: {
          desc: string;
          choose: number;
          type: string;
          from: {
            option_set_type: string;
            equipment_category?: ApiReference5E;
          };
        };
      }[];
    };
  }[];
  class_levels: string;
  levels: Level5E[];
  multi_classing: {
    prerequisites?: {
      ability_score?: ApiReference5E;
      minimum_score?: number;
    }[];
  };
  spellcasting?: {
    level: number;
    spellcasting_ability: ApiReference5E;
    info: {
      name: string;
      desc: string[];
    }[];
    spells?: ApiReference5E[];
  };
}
