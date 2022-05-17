"use strict";

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
    quotes: ["error", "single"],
    "no-unused-expressions": 1,
    // disabling circular dependency, as it is causing issues
    // allow param reassign for redux-toolkit
    "no-param-reassign": [1, { props: false }],
    "no-restricted-imports": [
      "error",
      {
        "patterns": [{
          "group": ["../*", "!$lib/*", "!$app/*"],
          "message": "relative path is deprecated, except the alias path $app or $lib."
        }],
      }
    ],
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "import/no-cycle": 0,
    "import/no-useless-path-segments": 1,
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
    "sonarjs/prefer-immediate-return": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "react/button-has-type": 0,
    // no return types needed if it can be inferred. useful for react components and sagas so it's less to worry about
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/prefer-optional-chain": 1,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/prefer-namespace-keyword": 0,
    "@typescript-eslint/no-namespace": 0,
    "require-jsdoc": 0,
    "prettier/prettier": 0,
    "filenames/match-regex": 0,
    "import/no-extraneous-dependencies": 0,
  }
};
