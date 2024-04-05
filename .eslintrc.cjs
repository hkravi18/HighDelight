module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        // "@typescript-eslint"
    ],
    "rules": {
      camelcase: "warn",
      "no-const-assign": "warn",
      "no-unused-vars": "warn",
      eqeqeq: "warn",
      curly: "error",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-unreachable": "warn",
      "no-empty": "error",
      "no-func-assign": "warn",
      "no-undef": "warn",
      "no-use-before-define": "warn",
      // "no-console": "warn",
      "no-debugger": "warn",
      "no-eval": "error",
      "no-alert": "warn",
      "no-redeclare": "warn",
      "no-delete-var": "error",
      "no-undef-init": "warn",
      "no-shadow": "warn",
      "no-shadow-restricted-names": "warn",
    },
}
