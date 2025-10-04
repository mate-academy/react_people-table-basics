export const API_CONFIG = {
  BASE_URL: 'https://mate-academy.github.io/react_people-table/api',
  ENDPOINTS: {
    PEOPLE: '/people.json',
  },
  FETCH_DELAY: 500, // Keep this delay for testing purpose
} as const;

export const MESSAGES = {
  LOADING_ERROR: 'Something went wrong',
  NO_PEOPLE: 'There are no people on the server',
  GENERIC_ERROR: 'An unexpected error occurred',
} as const;

export const TABLE_CONFIG = {
  COLUMN_NAMES: ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'] as const,
} as const;
