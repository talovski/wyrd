import type { ApiReference5E } from "./5e-api";

export interface Feature5E extends ApiReference5E {
  class: ApiReference5E;
  level: number;
  prerequisites: {
    type?: string;
    level?: number;
    feature?: ApiReference5E | string;
  }[];

  desc: string[];
  updated_at: string;
}
// { type?: string; level?: number; feature?: ApiReference5E; }
