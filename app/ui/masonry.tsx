import { For, type JSX, createMemo } from "solid-js";

import classnames from "~/utils/classnames";

type MasonryProps = {
  elements: JSX.Element[];
  class?: string;
};

export const Masonry = (props: MasonryProps) => {
  const masonry = createMemo(() => {
    const cols: JSX.Element[][] = [[], [], []];

    for (const [i, el] of props.elements.entries()) {
      cols[i % 3].push(el);
    }

    return cols;
  });

  return (
    <div class={classnames("grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3", props?.class)}>
      <For each={masonry()}>
        {(column) => (
          <div class="flex flex-col gap-2">
            <For each={column}>{(el) => el}</For>
          </div>
        )}
      </For>
    </div>
  );
};
