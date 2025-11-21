import { For } from "solid-js";
import type { Resource } from "solid-js";

import type { Class5E } from "~/types/5e/class";
import type { Spell5E } from "~/types/5e/spell";

import { Feature } from "./class-feature";
import { Spells } from "./spells";

export const Class = (props: Class5E & { spellData: Resource<Spell5E[] | undefined> }) => {
  return (
    <div>
      <h3>{props.name}</h3>
      <div>
        <For each={props.levels[0]?.features}>{(feature) => <Feature {...feature} />}</For>
      </div>
      <div>
        <Spells cls={props.index} spellData={props.spellData} />
      </div>
    </div>
  );
};
