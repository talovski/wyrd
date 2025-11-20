import type { ApiReference5E, From5E } from "./5e-api";

export interface Race5E extends ApiReference5E {
  speed: number;
  ability_bonuses: {
    ability_score: ApiReference5E;
    bonus: number;
  }[];
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: ApiReference5E[];
  languages: ApiReference5E[];
  language_desc: string;
  traits: Trait[];
  subraces: ApiReference5E[];
}

export interface Trait extends ApiReference5E {
  races: ApiReference5E[];
  subraces: ApiReference5E[];
  desc: string[];
  proficiencies: ApiReference5E[];
  trait_specific: {
    subtrait_options: From5E;
  };
}
