import { For, Show, createMemo } from "solid-js";

import type { Class5E } from "~/types/5e/class";
import type { Feature5E } from "~/types/5e/feature";
import type { Spell5E } from "~/types/5e/spell";

import { Features } from "./class-features";
import { Spells } from "./class-spells";

type Props = { cl: Class5E; spells: Spell5E[]; features: Feature5E[] };

export const Class = (props: Props) => {
  const cl = () => props.cl;
  const proficiencies = () => cl().proficiencies;
  const choices = () => cl().proficiency_choices;

  const spells = createMemo(() => {
    if (!props.spells) return undefined;

    const byLevel = props.spells.reduce(
      (acc, sp) => {
        if (!acc[sp.level]) acc[sp.level] = [];
        acc[sp.level].push(sp);
        return acc;
      },
      {} as Record<number, Spell5E[]>,
    );

    return byLevel;
  });

  const features = createMemo(() => {
    if (!props.features) return undefined;

    const byLevel = props.features.reduce(
      (acc, feat) => {
        if (!acc[feat.level]) acc[feat.level] = [];
        acc[feat.level].push(feat);
        return acc;
      },
      {} as Record<number, Feature5E[]>,
    );

    return byLevel;
  });

  return (
    <div class="relative px-4 pt-2">
      <h3 class="bg-base-150 sticky top-0 px-2 pt-1 pb-2 font-serif text-2xl font-bold">
        {cl().name}
      </h3>
      <div>
        <p>Hit Die: {cl().hit_die}</p>
        <Show when={proficiencies() || choices()}>
          <div>
            <p class="text-lg font-bold">Proficiencies:</p>
            <ul>
              <For each={proficiencies()}>{(prof) => <li>{prof.name}</li>}</For>
            </ul>
          </div>
          <For each={choices()}>{(prof) => <p>+ {prof.desc}</p>}</For>
        </Show>
      </div>
      <Show when={features()}>{(features) => <Features features={features()} />}</Show>
      <Show when={spells()}>{(spells) => <Spells spells={spells()} />}</Show>
    </div>
  );
};
