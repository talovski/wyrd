import { For, Show } from "solid-js";

import classes from "~/data/classes.json";
import features from "~/data/features.json";
import spells from "~/data/spells.json";
import type { Feature5E } from "~/types/5e/feature";
import type { Spell5E } from "~/types/5e/spell";

import { Class } from "./class";

const spellsByClass = spells.reduce(
  (acc, spell) => {
    spell.classes.forEach((cl) => {
      if (!acc[cl.index]) acc[cl.index] = [];
      acc[cl.index].push(spell);
    });
    return acc;
  },
  {} as Record<string, Spell5E[]>,
);

Object.values(spellsByClass).forEach((list) => list.sort((a, b) => a.level - b.level));

const featuresByClass = features.reduce(
  (acc, feature) => {
    const key = feature.class.index;
    if (!acc[key]) acc[key] = [];
    acc[key].push(feature);
    return acc;
  },
  {} as Record<string, Feature5E[]>,
);

Object.values(featuresByClass).forEach((list) => list.sort((a, b) => a.level - b.level));

export const ClassList = () => {
  return (
    <div class="flex flex-col gap-4">
      <Show when={classes}>
        <For each={classes}>
          {(cl) => (
            <Class cl={cl} spells={spellsByClass[cl.index]} features={featuresByClass[cl.index]} />
          )}
        </For>
      </Show>
    </div>
  );
};
