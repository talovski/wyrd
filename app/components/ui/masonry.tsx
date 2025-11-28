import { For, type JSX, createMemo } from "solid-js";

import classnames from "~/utils/classnames";

type MasonryProps = {
  elements: JSX.Element[];
  columns?: number;
  class?: string;
};

export const Masonry = (props: MasonryProps) => {
  const elements = () => props.elements;
  const columns = () => props?.columns ?? 3;

  const masonry = createMemo(() => {
    const split = elements().reduce(
      (acc, el, i) => {
        const col = i % columns();
        if (!acc[col]) acc[col] = [];
        acc[col].push(el);
        return acc;
      },
      {} as Record<number, JSX.Element[]>,
    );

    return split;
  });
  return (
    <div class={classnames("grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3", props.class)}>
      <For each={Array.from({ length: columns() }, (_, i) => i)}>
        {(col) => (
          <div class={classnames("flex flex-col gap-3", `grid-col-${col + 1}`)}>
            <For each={masonry()[col]}>{(el) => el}</For>
          </div>
        )}
      </For>
    </div>
  );
};
