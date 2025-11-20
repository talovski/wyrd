import type { ApiReference5E } from "./5e-api";

export interface AbilityScore5E extends ApiReference5E {
  full_name: string;
  desc: string[];
  skills: ApiReference5E[];
}
