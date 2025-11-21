import { For, Show, createResource } from "solid-js";

import type { Class5E } from "~/types/5e/class";
import type { Spell5E } from "~/types/5e/spell";
import { fetcher } from "~/utils/fetcher";

import { Class } from "./class";

const [classesData] = createResource(async () => {
  return await fetcher<Class5E[]>("/public/data/5e/classes.json");
});

const [spellData] = createResource(async () => {
  return await fetcher<Spell5E[]>("/public/data/5e/spells.json");
});

export const ClassList = () => {
  return (
    <div>
      <Show when={classesData.loading || spellData.loading}>Loading</Show>
      <Show when={classesData() && spellData()}>
        <For each={classesData()}>{(c) => <Class {...c} spellData={spellData} />}</For>
      </Show>
    </div>
  );
};
