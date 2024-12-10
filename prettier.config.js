export default {
  arrowParens: 'avoid',
  singleQuote: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  semi: false,
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 80,
  importOrder: [
    // React and related core packages
    '^react$',
    '^react-dom$',
    '^react-router-dom$',
    '^next$',
    '^next/.*$',

    // External libraries and dependencies
    '^@?\\w',

    // Absolute imports and other packages
    '^(@|~)/.*$',

    // UI Component libraries
    '^@mui/.*$',
    '^@chakra-ui/.*$',
    '^@tailwindcss/.*$',
    '^@headlessui/.*$',
    '^@heroicons/.*$',

    // State management
    '^@reduxjs/.*$',
    '^@tanstack/.*$',
    '^zustand$',
    '^jotai$',

    // Utilities
    '^lodash.*$',
    '^axios$',
    '^date-fns$',

    // Styles
    '^styled-components$',
    '^.+\\.styles$',
    '^.+\\.css$',
    '^.+\\.scss$',

    // Local imports
    '^@/components/.*$',
    '^@/hooks/.*$',
    '^@/utils/.*$',
    '^@/services/.*$',
    '^@/store/.*$',
    '^@/types/.*$',
    '^@/constants/.*$',
    '^@/config/.*$',

    // Relative imports
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  plugins: ['@trivago/prettier-plugin-sort-imports']
}
