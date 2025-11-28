import type { ApiReference5E } from "./5e-api";

export interface Spell5E extends ApiReference5E {
  higher_level: string[];
  desc: string[];
  range: string;
  components: string[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: ApiReference5E;
  classes: ApiReference5E[];
  subclasses: ApiReference5E[];
  url: string;
}
