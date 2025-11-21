import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/typescript";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  solid,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",

      "@typescript-eslint/no-explicit-any": "off",
      "solid/no-innerhtml": "off",
    },
  },
  {
    ignores: ["dist", "node_modules", ".solid"],
  },
];
