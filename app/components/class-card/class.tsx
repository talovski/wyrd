import { For, Show, createMemo } from "solid-js";

import type { Class5E } from "~/types/5e/class";
import type { Feature5E } from "~/types/5e/feature";
import type { Spell5E } from "~/types/5e/spell";

import { Features } from "./class-features";
import { Spells } from "./class-spells";

type Props = { cl: Class5E; spells: Spell5E[]; features: Feature5E[] };

export const Class = (props: Props) => {
  const proficiencies = () => props.cl.proficiencies;
  const proficiencyChoices = () => props.cl.proficiency_choices;

  const spells = createMemo(() => {
    if (!props.spells) return undefined;

    const lvl1: Spell5E[] = [];
    const progression: Spell5E[] = [];

    props.spells?.forEach((sp) => {
      if (sp.level === 1) lvl1.push(sp);
      if (sp.level > 1) progression.push(sp);
    });
    return { lvl1, progression };
  });

  const features = createMemo(() => {
    if (!props.features) return undefined;

    const lvl1: Feature5E[] = [];
    const progression: Feature5E[] = [];

    props.features?.forEach((feat) => {
      if (feat.level === 1) lvl1.push(feat);
      if (feat.level > 1) progression.push(feat);
    });
    return { lvl1, progression };
  });

  return (
    <div class="relative px-4 pt-2">
      <h3 class="bg-base-150 sticky top-0 px-2 pt-1 pb-2 font-serif text-2xl font-bold">
        {props.cl.name}
      </h3>
      <div>
        <p>Hit Die: {props.cl.hit_die}</p>
        <Show when={proficiencies()?.length || proficiencyChoices()?.length}>
          <div class="grid grid-cols-2">
            <div>
              <p class="text-lg font-bold">Proficiencies:</p>
              <ul>
                <For each={props.cl.proficiencies}>{(prof) => <li>{prof.name}</li>}</For>
              </ul>
            </div>
            <div>
              <p class="text-lg font-bold">+</p>
              <For each={props.cl.proficiency_choices}>
                {(prof) => (
                  <div>
                    <p>{prof.desc}</p>
                    <ul>
                      <For each={prof.from.options}>{(opt) => <li>{opt.item?.name}</li>}</For>
                    </ul>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
      <Show when={features()}>
        <Features features={features()!} />
      </Show>

      <Show when={spells()}>{(spells) => <Spells spells={spells()} />}</Show>
    </div>
  );
};
