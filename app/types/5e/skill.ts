import type { ApiReference5E } from "./5e-api";

export interface Skill5E extends ApiReference5E {
  desc: string[];
  ability_score: ApiReference5E;
}
