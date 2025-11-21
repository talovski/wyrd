import { twMerge } from "tailwind-merge";

const classnames = (...cls: (string | undefined | boolean)[]) => twMerge(cls.filter(Boolean).join(" "));

export default classnames;
