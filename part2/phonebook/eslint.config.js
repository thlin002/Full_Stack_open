import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], rules: {"react/jsx-uses-react": "off", "react/react-in-jsx-scope": "off"} },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  { settings: { react: { version: "detect" } } },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
]);