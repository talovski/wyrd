import { For, Show, createResource } from "solid-js";

import type { Class5E } from "~/types/5e/class";
import { fetcher } from "~/utils/fetcher";

import { Cls } from "./class";

const [classesData] = createResource(async () => {
  return await fetcher<Class5E[]>("/public/data/5e/classes.json");
});

export const Classes = () => {
  return (
    <div>
      <Show when={classesData.loading}>Loading</Show>
      <Show when={classesData()}>
        <For each={classesData()}>{(c) => <Cls {...c} />}</For>
      </Show>
    </div>
  );
};
