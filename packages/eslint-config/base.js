import js from '@eslint/js'
import typescriptESLintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import autofix from 'eslint-plugin-autofix'
import onlyWarn from 'eslint-plugin-only-warn'
import prettier from 'eslint-plugin-prettier'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import turboPlugin from 'eslint-plugin-turbo'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  // Ignore List
  {
    ignores: [
      // Next.js specific
      '**/.next/**',
      '**/next-env.d.ts',
      '**/next.config.js',
      '**/next.config.mjs',

      // Build Outputs
      '**/dist/**',
      '**/build/**',
      '**/out/**',

      // Dependencies
      '**/node_modules/**',

      // Cache directories
      '**/.cache/**',
      '**/.swc/**',

      // Environment and config files
      '**/.env*',
      '**/env.d.ts',
      '**/.eslintrc.js',
      '**/eslint.config.js',
      '**/eslint.config.mjs',
      '**/.prettierrc',
      '**/prettier.config.js',
      '**/jest.config.js',
      '**/jest.setup.js',

      // coverage Reports
      '**/coverage/**',

      // Public assets
      '**/public/**',

      // Package Manager files
      '**/package-lock.json',
      '**/yarn.lock',
      '**/pnpm-lock.yml',

      // Misc development files
      '**/*.min.js',
      '**/*.d.ts',
      '**/LICENSE',
      '**/README.md',
      '**/NOTES.md',

      // Version Control
      '**/.git/**',

      // IDE / OS Files folders
      '**/.vscode/**',
      '**/.idea/**',
      '**/.DS_STORE',

      // PWA Files
      '**/sw.js',
      '**/workbox-*.js',

      // Storybook
      '**/.storybook/**',
      '**/storybook-static/**',
      '**/stories/**',

      // Testing snapshots
      '**/__snapshots__/**'
    ]
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true
    }
  },
  // Global environment settings
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  js.configs.recommended,

  // Typescript configuration
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptESLintPlugin
    },
    rules: {
      ...typescriptESLintPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 1,
      'no-undef': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types:': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      ...eslintConfigPrettier.rules
    }
  },

  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn'
    }
  },
  {
    plugins: {
      onlyWarn
    }
  },
  // Prettier configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettier
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      autofix: autofix
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-constructed-context-values': 'error',
      'no-console': 'warn',
      'spaced-comment': 'warn',
      'no-redeclare': 'warn',
      'react/display-name': 'error',
      'react/jsx-key': 'warn',
      'arrow-body-style': ['warn', 'always'],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'autofix/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports'
        }
      ]
    }
  }
]
