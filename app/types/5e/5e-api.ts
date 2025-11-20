export interface ApiReference5E {
  name: string;
  index: string;
  url: string;
}

export interface ApiResponse5E<T> {
  count: number;
  results: T[];
}

export interface From5E {
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
}

export interface Option extends ApiReference5E {
  classes: ApiReference5E[];
  races: ApiReference5E[];
  reference: ApiReference5E;
  type: string;
  updated_at: string;
}
