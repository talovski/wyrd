// import { css } from "@acab/ecsstatic";
import type { JSX } from "solid-js";
import { Show, createEffect, createSignal, createUniqueId, onCleanup } from "solid-js";

import classnames from "~/utils/classnames";

interface DropdownProps {
  btnContent: JSX.Element;
  children: JSX.Element;
  multiSelect?: boolean;
}

export const Dropdown = (props: DropdownProps) => {
  const [open, setOpen] = createSignal(false);
  const [focusable, setFocusable] = createSignal<HTMLElement[]>([]);
  const dropdownId = createUniqueId();

  let btnRef!: HTMLButtonElement;
  let menuRef!: HTMLDivElement;

  createEffect(() => {
    if (!open() || !menuRef) return;
    const elements = Array.from(
      menuRef?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];

    setFocusable(() => elements);
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (!open()) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.focus();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      const curr = focusable().indexOf(document.activeElement as HTMLElement);

      if (e.key === "ArrowDown") {
        const next = curr < focusable().length - 1 ? curr + 1 : 0;
        focusable()[next]?.focus();
      } else {
        const prev = curr > 0 ? curr - 1 : focusable().length - 1;
        focusable()[prev]?.focus();
      }
      return;
    }

    if ((e.key === "Enter" || e.key === " ") && !props.multiSelect) {
      e.preventDefault();
      setOpen(false);
      btnRef.focus();
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!menuRef?.contains(target) && !btnRef?.contains(target)) {
      setOpen(false);
    }
  };

  createEffect(() => {
    if (!open()) return;
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);

    onCleanup(() => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    });
  });

  return (
    <div class="relative">
      <button
        class={classnames("button-small", open() ? "scale-[0.98]" : "")}
        aria-expanded={open()}
        aria-haspopup="true"
        aria-controls={open() ? dropdownId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        data-open={open()}
        ref={btnRef}
      >
        {props.btnContent}
      </button>
      <Show when={open()}>
        <div
          ref={menuRef}
          role="menu"
          class="border-base-300 bg-base-100 absolute top-9 z-1 rounded-sm border border-solid p-2 shadow-md"
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
};
