import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // 匹配的文件
    languageOptions: {
      globals: globals.browser, // 浏览器环境的全局变量
      parser: tseslintParser,  // 使用 TypeScript ESLint 解析器
    },
    plugins: {
      "@typescript-eslint": tseslint, // 引入 TypeScript 插件
      react: pluginReact,            // 引入 React 插件
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript 推荐规则
      ...tseslint.configs.recommended.rules, // TypeScript 推荐规则
      ...pluginReact.configs.recommended.rules, // React 推荐规则
      "react/react-in-jsx-scope": "off", // 禁用 React 必须在作用域的规则
    },
  },
];
