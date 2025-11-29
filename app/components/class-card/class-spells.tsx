import { marked } from "marked";
import { For, Show } from "solid-js";

import type { Spell5E } from "~/types/5e/spell";
import { Expandable } from "~/ui/expandable";

type SpellsProps = {
  spells: Record<number, Spell5E[]>;
};

const Spell = (spell: Spell5E) => {
  const desc = () => marked.parse(spell?.desc.join("\n") || "", { async: false });
  return (
    <div class="bg-base-50 border-base-200 rounded-md border px-2 py-1 shadow-sm">
      <h4 class="text-lg font-bold">{spell.name}</h4>
      <Show when={desc()}>
        <div innerHTML={desc()} />
      </Show>
    </div>
  );
};

export const Spells = (props: SpellsProps) => {
  const progression = () => Object.entries(props.spells);
  return (
    <Show when={progression()}>
      {(levels) => (
        <>
          <p class="relative pt-4 pb-2 text-2xl font-bold">Spells</p>
          <For each={levels()}>
            {([level, spells]) => (
              <Expandable trigger={<h4 class="font-bold">Level {level} Spells</h4>}>
                <For each={spells}>{(spell) => <Spell {...spell} />}</For>
              </Expandable>
            )}
          </For>
        </>
      )}
    </Show>
  );
};
