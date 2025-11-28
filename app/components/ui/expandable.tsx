import { ChevronDown } from "lucide-solid";
import { type JSX, createSignal, createUniqueId } from "solid-js";

import classnames from "~/utils/classnames";

type ExpandableProps = {
  children: JSX.Element;
  triggerContent: JSX.Element;
  triggerClass?: string;
  defaultExpanded?: boolean;
  class?: string;
};

export const Expandable = (props: ExpandableProps) => {
  const [expanded, setExpanded] = createSignal(props.defaultExpanded ?? false);
  const triggerId = createUniqueId();
  const contentId = createUniqueId();

  return (
    <div class="flex flex-col overflow-hidden">
      <h4 class={classnames("flex w-full justify-between", props.triggerClass)}>
        <button
          id={triggerId}
          aria-controls={contentId}
          aria-expanded={expanded()}
          data-expanded={expanded()}
          class="group flex w-full cursor-pointer items-center gap-2"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {props.triggerContent}
          <div class="border-base-300 bg-base-100 group-hover:bg-base-150 h-fit w-fit rounded-sm border px-1 py-1 font-medium shadow-sm group-active:scale-98 group-data-[expanded=true]:scale-98">
            <ChevronDown
              width={14}
              height={14}
              stroke-width={4}
              class={expanded() ? "rotate-180" : ""}
            />
          </div>
        </button>
      </h4>
      <div
        id={contentId}
        aria-labelledby={triggerId}
        role="region"
        class={classnames(
          "invisible grid grid-rows-[0fr] gap-2 ps-3 pt-2 transition-all duration-200 ease-in-out",
          expanded() && "visible grid-rows-[1fr] pt-2 pb-4",
        )}
      >
        <div class="flex flex-col overflow-hidden">{props.children}</div>
      </div>
    </div>
  );
};
