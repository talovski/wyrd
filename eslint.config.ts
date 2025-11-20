import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/typescript";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  solid,
  {
    rules: {
      // Allow the stuff you want
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "off",

      // Optional: turn off other noisy TS rules
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: ["dist", "node_modules", ".solid"],
  },
];
