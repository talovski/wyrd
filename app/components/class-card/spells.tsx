import { marked } from "marked";
import { For, Show, createMemo, createResource } from "solid-js";

import type { Spell5E } from "~/types/5e/spell";
import { fetcher } from "~/utils/fetcher";

const [spellData] = createResource(async () => {
  return await fetcher<Spell5E[]>(`/public/data/5e/spells.json`);
});

export const Spells = (props: { cls: string }) => {
  const filteredSpells = createMemo(() => {
    const spells = spellData();

    if (!spells) {
      console.info("No spells data available");
      return [];
    }

    if (spells) {
      const classSpells = spells.filter((s) => s.classes.some((c) => c.index === props.cls));

      if (!classSpells?.length) {
        console.info(`No spells found for class: ${props.cls}`);
        return;
      }
      return classSpells;
    }
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
