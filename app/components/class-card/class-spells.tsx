import { marked } from "marked";
import { For, Show } from "solid-js";

import { Expandable } from "~/components/ui/expandable";
import type { Spell5E } from "~/types/5e/spell";

import { Masonry } from "../ui/masonry";

type SpellsProps = {
  spells: {
    lvl1: Spell5E[] | undefined;
    progression: Spell5E[] | undefined;
  };
};

type SpellProps = {
  spell: Spell5E;
  expandable?: boolean;
};

export const Spells = (props: SpellsProps) => {
  const lvl1 = () => props.spells.lvl1;
  const progression = () => props.spells.progression;

  return (
    <div>
      <p class="pt-4 pb-2 text-2xl font-bold">Spells</p>
      <Show when={lvl1()}>
        {(e) => (
          <>
            <h4 class="font-bold">Level 1 Spells</h4>
            <Masonry
              elements={e()?.map((spell) => (
                <Spell spell={spell} />
              ))}
            />
          </>
        )}
      </Show>
      <Show when={progression()?.length}>
        <Expandable triggerContent={<h4 class="font-bold">Spells Progression</h4>}>
          <For each={progression()}>{(spell) => <Spell spell={spell} />}</For>
        </Expandable>
      </Show>
    </div>
  );
};

function Spell(props: SpellProps) {
  const spell = () => props.spell;
  const html = () => marked.parse(props.spell.desc.join("\n"), { async: false });

  return (
    <Show
      when={props.expandable}
      fallback={
        <div class="bg-base-50 border-base-200 rounded-md border px-2 py-1 shadow-sm">
          <h4 class="text-lg font-bold">{spell().name}</h4>
          <div innerHTML={html()} />
        </div>
      }
    >
      <div>
        <Show when={html()}>
          <Expandable triggerContent={props.spell.name}>
            <p innerHTML={html()} />
          </Expandable>
        </Show>
      </div>
    </Show>
  );
}
