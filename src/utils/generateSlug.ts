import type { Person } from '../types/Person';

export const generateSlug = (person: Person): string =>
  person.name.trim().toLowerCase().replace(/\s+/g, '-');
