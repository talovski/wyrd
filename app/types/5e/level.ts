import type { ApiReference5E } from "./5e-api";

export interface Level5E {
  name?: string;
  index: string;
  url: string;
  level: number;
  ability_score_bonuses: number;
  prof_bonus: number;
  features: ApiReference5E[];
  spellcasting?: {
    cantrips_known?: number;
    spells_known?: number;
    spell_slots_level_1?: number;
    spell_slots_level_2?: number;
    spell_slots_level_3?: number;
    spell_slots_level_4?: number;
    spell_slots_level_5?: number;
    spell_slots_level_6?: number;
    spell_slots_level_7?: number;
    spell_slots_level_8?: number;
    spell_slots_level_9?: number;
  };
  class_specific?: Record<string, unknown>;
}
