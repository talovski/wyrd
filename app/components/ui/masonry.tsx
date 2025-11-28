import { createMemo, For, type JSX } from "solid-js";
import classnames from "~/utils/classnames";

type MasonryProps = {
  elements: JSX.Element[];
  columns?: number;
  class?: string;
};

export const Masonry = (props: MasonryProps) => {
  const elements = () => props.elements;
  const columns = () => props.columns || 3;

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
  //
  return (
    <div
      class={classnames(
        "grid",
        `grid-cols-1 md:grid-cols-${columns() - 1} lg:grid-cols-${columns()}`,
        props.class,
      )}
    >
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
