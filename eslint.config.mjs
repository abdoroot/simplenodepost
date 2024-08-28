// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default {
    languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: './tsconfig.json',
        }
    },
    files: ["src/**/*.ts"],
    rules: {
        semi: "off", // Semicolons are optional

        // Code quality rules
        'no-console': 'warn', // Warn when `console` statements are used
        'curly': 'warn', // Enforce consistent brace style for all control statements
        'eqeqeq': ['error', 'always'], // Enforce strict equality (`===` and `!==`)
        'no-shadow': 'warn', // Warn on variable declarations from shadowing variables declared in the outer scope
        'no-duplicate-imports': 'warn', // Disallow duplicate imports
        'no-var': 'error', // Disallow usage of `var`, prefer `const` or `let`
        'prefer-const': 'warn', // Suggest using `const` wherever possible
    },
};
