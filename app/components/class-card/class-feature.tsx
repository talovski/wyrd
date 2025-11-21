import { For, createEffect, createResource, createSignal } from "solid-js";

import type { ApiReference5E } from "~/types/5e/5e-api";
import type { Feature5E } from "~/types/5e/feature";
import { fetcher } from "~/utils/fetcher";

const [featuresData] = createResource(async () => {
  return await fetcher<Feature5E[]>(`/public/data/5e/features.json`);
});

export const Feature = (props: ApiReference5E) => {
  const [feature, setFeature] = createSignal<Feature5E>();

  createEffect(() => {
    if (featuresData()) {
      const found = featuresData()?.find((fe) => fe.index === props.index);
      if (found) {
        setFeature(found);
      } else {
        console.error(`Feature not found: ${props.index}`);
      }
    }
  });

  return (
    <div>
      <p class="font-bold text-lg">Level 1 features</p>
      <p class="font-bold text-lg">{feature()?.name}</p>
      <div class="font-serif flex flex-col gap-2">
        <For each={feature()?.desc}>{(p) => <p>{p}</p>}</For>
      </div>
    </div>
  );
};
