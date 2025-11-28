import { marked } from "marked";
import { For, Show } from "solid-js";

import type { Feature5E } from "~/types/5e/feature";

import { Expandable } from "../ui/expandable";

type FeaturesProps = {
  features: {
    lvl1: Feature5E[] | undefined;
    progression: Feature5E[] | undefined;
  };
};

type FeatureProps = {
  feature: Feature5E;
  expandable?: boolean;
};

export const Features = (props: FeaturesProps) => {
  const features = () => props.features;
  const lvl1 = () => features()?.lvl1;
  const progression = () => features()?.progression;

  return (
    <div>
      <p class="text-xl font-bold">Features</p>
      <div class="flex flex-col gap-4">
        <Show when={lvl1()?.length}>
          <div>
            <h4 class="font-bold">Level 1 Features</h4>
            <For each={lvl1()}>{(feat) => <Feature feature={feat} expandable={false} />}</For>
          </div>
        </Show>
        <Show when={progression()?.length}>
          <Expandable triggerContent={<h4 class="font-bold">Feature Progression</h4>}>
            <For each={progression()}>{(feat) => <Feature feature={feat} />}</For>
          </Expandable>
        </Show>
      </div>
    </div>
  );
};

export const Feature = (props: FeatureProps) => {
  const feat = () => props.feature;
  const html = () => marked.parse(feat()?.desc.join("\n") || "", { async: false });

  return (
    <Show
      when={props.expandable}
      fallback={
        <div>
          <h4 class="text-lg font-bold">{feat().name}</h4>
          <div innerHTML={html()} />
        </div>
      }
    >
      <Expandable triggerContent={feat()?.name}>
        <div innerHTML={html()} />
      </Expandable>
    </Show>
  );
};
