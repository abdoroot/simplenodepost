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
        semi: "off"
    }
}