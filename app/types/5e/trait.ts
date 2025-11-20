import type { ApiReference5E } from "./5e-api";

export interface Trait5E extends ApiReference5E {
  races: ApiReference5E[];
  subraces: ApiReference5E[];
  desc: string[];
  proficiencies: ApiReference5E[];
}
