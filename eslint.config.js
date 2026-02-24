import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
	{
		ignores: ['dist', 'node_modules'],
	},
	// Base JS rules
	js.configs.recommended,

	// TypeScript rules
	...tseslint.configs.recommended,

	// Main app config
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			// React
			...reactPlugin.configs.recommended.rules,
			...reactPlugin.configs['jsx-runtime'].rules, // Disables need to import React in scope
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// Accessibility
			...jsxA11y.configs.recommended.rules,

			// TypeScript
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},

	// Test file config
	{
		files: [
			'**/*.test.{ts,tsx,js,jsx}',
			'**/*.spec.{ts,tsx,js,jsx}',
			'**/setupTests.*',
		],
		plugins: {
			jest,
			'testing-library': testingLibrary,
		},
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
		rules: {
			...jest.configs.recommended.rules,
			...testingLibrary.configs.react.rules,
		},
	},

	// Prettier must be last — disables formatting rules that conflict
	prettier,
);
