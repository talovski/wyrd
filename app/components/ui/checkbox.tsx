import { CheckIcon } from "lucide-solid";
import { type ComponentProps, type JSX, createUniqueId } from "solid-js";

import { merge } from "~/utils/merge";

interface CheckboxProps extends Omit<ComponentProps<"input">, "type" | "onChange"> {
  checked: boolean;
  children: JSX.Element;
  disabled?: boolean;
  defaultChecked?: boolean;
}

export const Checkbox = (props: CheckboxProps) => {
  const inputId = createUniqueId();

  return (
    <label
      class={merge(
        "relative flex h-fit w-fit cursor-pointer items-center gap-[0.45rem]",
        props.disabled && "cursor-not-allowed opacity-50",
      )}
      data-disabled={props.disabled}
      for={inputId}
    >
      <input
        {...props}
        class="peer absolute h-0 w-0 opacity-0"
        id={inputId}
        aria-checked={props.checked}
        default-checked={props.defaultChecked}
        disabled={props.disabled}
        type="checkbox"
      />
      <div
        class={merge(
          "flex aspect-[1] w-5 items-center justify-center overflow-hidden rounded-sm border-2 border-zinc-500 true:border-zinc-900 border-solid bg-zinc-100 p-0.5",
          "peer-focus-visible:-outline-offset-1 peer-focus-visible:outline-[3px] peer-focus-visible:outline-purple-800 peer-focus-visible:outline-solid",
          props.checked && "border-zinc-900",
        )}
        aria-hidden="true"
      >
        {props.checked && <CheckIcon class="h-100 w-100" stroke-width={4} />}
      </div>
      {props.children}
    </label>
  );
};
