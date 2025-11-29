import { marked } from "marked";
import { For, Show } from "solid-js";

import type { Feature5E } from "~/types/5e/feature";
import { Expandable } from "~/ui/expandable";

type FeaturesProps = {
  features: Record<number, Feature5E[]>;
};

const Feature = (props: { feature: Feature5E }) => {
  const desc = () => marked.parse(props.feature?.desc.join("\n") || "", { async: false });
  return (
    <div>
      <h4 class="text-lg font-bold">{props.feature.name}</h4>
      <div innerHTML={desc()} />
    </div>
  );
};

const List = (props: { features: Feature5E[] }) => (
  <For each={props.features}>{(feature) => <Feature feature={feature} />}</For>
);

export const Features = (props: FeaturesProps) => {
  const progression = () => Object.entries(props.features);

  return (
    <Show when={progression()}>
      <p class="text-xl font-bold">Features</p>
      <For each={progression()}>
        {([level, features]) => (
          <Show when={+level > 1} fallback={<List features={features} />}>
            <Expandable trigger={<h4 class="font-bold">Level {level} features</h4>}>
              <List features={features} />
            </Expandable>
          </Show>
        )}
      </For>
    </Show>
  );
};
