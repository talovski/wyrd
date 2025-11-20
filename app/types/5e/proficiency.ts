import type { ApiReference5E } from "./5e-api";

export interface Proficiency5E extends ApiReference5E {
  classes: ApiReference5E[];
  races: ApiReference5E[];
  reference: ApiReference5E;
  type: string;
}
