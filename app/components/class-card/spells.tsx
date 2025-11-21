import { marked } from "marked";
import { For, Show, createMemo } from "solid-js";
import type { Resource } from "solid-js";

import type { Spell5E } from "~/types/5e/spell";

export const Spells = (props: { cls: string; spellData: Resource<Spell5E[] | undefined> }) => {
  const filteredSpells = createMemo(() => {
    const spells = props.spellData();

    if (!spells) return [];
    if (spells) return spells.filter((s) => s.classes.some((c) => c.index === props.cls));
  });

  return (
    <div>
      <p class="text-lg font-bold">Spells</p>
      <For each={filteredSpells()}>{(spell) => <Spell {...spell} />}</For>
    </div>
  );
};

const Spell = (spell: Spell5E) => {
  const html = () => marked.parse(spell.desc.join("\n"), { async: false }) as string;

  return (
    <div>
      <p class="text-md font-bold">{spell.name}</p>
      <Show when={html()}>
        <div class="flex flex-col gap-2 font-serif">
          <p innerHTML={html()} />
        </div>
      </Show>
    </div>
  );
};
