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
  desc?: string;
  choose?: number;
  type?: string;
  from?: {
    option_set_type: string;
    equipment_category?: ApiReference5E;
    options?: {
      option_type?: string;
      count?: number;
      of?: ApiReference5E;
      item?: ApiReference5E;
      prerequisites?: {
        type: string;
        proficiency: ApiReference5E;
      }[];
      choice?: {
        desc: string;
        choose: number;
        type: string;
        from: {
          option_set_type: string;
          equipment_category?: ApiReference5E;
        };
      };
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
