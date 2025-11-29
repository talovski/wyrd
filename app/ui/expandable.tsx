import { ChevronDown } from "lucide-solid";
import { type JSX, createSignal, createUniqueId } from "solid-js";

import classnames from "~/utils/classnames";

type ExpandableProps = {
  children: JSX.Element;
  trigger: JSX.Element;
  triggerClass?: string;
  open?: boolean;
  contentClass?: string;
};

/* NOTE: rewrite to `details` when figure out how to animate opening / closing */
export const Expandable = (props: ExpandableProps) => {
  const [expanded, setExpanded] = createSignal(props.open ?? false);
  const triggerId = createUniqueId();
  const contentId = createUniqueId();

  return (
    <div class="flex flex-col overflow-visible">
      <button
        id={triggerId}
        type="button"
        aria-controls={contentId}
        aria-expanded={expanded()}
        class={classnames(
          "flex w-full cursor-pointer items-center justify-between gap-2 text-left",
          props.triggerClass,
        )}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {props.trigger}
        <div
          class="border-base-300 bg-base-100 hover:bg-base-150 h-fit w-fit rounded-sm border px-1 py-1 font-medium shadow-sm active:scale-98 data-[expanded=true]:scale-98"
          aria-hidden="true"
        >
          <ChevronDown
            width={14}
            height={14}
            stroke-width={4}
            class={classnames("transition-transform duration-200", expanded() && "rotate-180")}
          />
        </div>
      </button>
      <div
        id={contentId}
        aria-labelledby={triggerId}
        role="region"
        aria-hidden={!expanded()}
        class={classnames(
          "invisible grid grid-rows-[0fr] gap-2 ps-3 pt-2 transition-all duration-200 ease-in-out",
          expanded() && "visible grid-rows-[1fr] pb-4",
          props.contentClass,
        )}
      >
        <div class="flex flex-col overflow-hidden">{props.children}</div>
      </div>
    </div>
  );
};
