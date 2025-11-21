import type { ApiReference5E } from "./5e-api";

export interface Feature5E extends ApiReference5E {
  class: ApiReference5E;
  level: number;
  prerequisites: ApiReference5E[];
  desc: string[];
  updated_at: string;
}
