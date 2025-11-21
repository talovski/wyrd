import { For } from "solid-js";

import type { Class5E } from "~/types/5e/class";

import { Feature } from "./class-feature";
import { Spells } from "./spells";

export const Cls = (props: Class5E) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <div>
        <For each={props.levels[0]?.features}>{(feature) => <Feature {...feature} />}</For>
      </div>
      <div>
        <Spells cls={props.index} />
      </div>
    </div>
  );
};
