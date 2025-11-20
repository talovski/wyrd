import { twMerge } from "tailwind-merge";

export const merge = (...cls: (string | undefined | boolean)[]) =>
  twMerge(cls.filter(Boolean).join(" "));
