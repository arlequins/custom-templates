module.exports = {
  env: {
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "eslint-config-prettier",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  plugins: [
    "filenames",
    "prefer-arrow",
    "@typescript-eslint",
    "import",
    "sonarjs",
    "eslint-plugin-prettier",
  ],
  rules: {
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        "disallowPrototype": true,
        "singleReturnOnly": false,
        "classPropertiesAllowed": false
      }
    ],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 200,
        bracketSpacing: true,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto"
      },
    ],
    quotes: ["error", "single"],
    "import/no-unresolved": 0,
    "sonarjs/prefer-immediate-return": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "no-unused-expressions": 1,
    // disabling circular dependency, as it is causing issues
    "import/no-cycle": 0,
    // allow param reassign for redux-toolkit
    "no-param-reassign": ["error", { props: false }],
    // no return types needed if it can be inferred. useful for react components and sagas so it's less to worry about
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/prefer-optional-chain": 1,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/prefer-namespace-keyword": 0,
    "@typescript-eslint/no-namespace": 0,
    "require-jsdoc": 0,
    "react/button-has-type": 0,
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.stories.tsx"] },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@app/components/*/*/*"],
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "styles/**",
            group: "internal",
            position: "after",
          },
          { group: "builtin", pattern: "react", position: "before" },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "filenames/match-regex": [2, "^[a-z-.]+$", true],
      },
    },
    {
      files: ["*.tsx"],
      rules: {
        "filenames/match-regex": [2, "^[A-Z][a-z].+(?:[A-Z][a-z].+)*$", true],
      },
    },
    {
      files: ["src/index.tsx", "src/index.production.tsx", "src/reportWebVitals.ts", "src/setupTests.ts", "*.test.tsx"],
      rules: {
        "filenames/match-regex": "off",
      },
    },
  ],
};
