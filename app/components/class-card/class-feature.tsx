import { marked } from "marked";
import { createMemo, createResource } from "solid-js";

import type { ApiReference5E } from "~/types/5e/5e-api";
import type { Feature5E } from "~/types/5e/feature";
import { fetcher } from "~/utils/fetcher";

const [featuresData] = createResource(async () => {
  return await fetcher<Feature5E[]>(`/public/data/5e/features.json`);
});

export const Feature = (props: ApiReference5E) => {
  const feature = createMemo(() => {
    const found = featuresData()?.find((fe) => fe.index === props.index);

    if (!found) console.error(`Feature not found: ${props.index}`);

    return found;
  });

  const html = () => marked.parse(feature()?.desc.join("\n") || "", { async: false }) as string;

  return (
    <div>
      <p class="text-lg font-bold">Level 1 features</p>
      <p class="text-lg font-bold">{feature()?.name}</p>
      <div class="flex flex-col gap-1">
        <div innerHTML={html()} />
      </div>
    </div>
  );
};
