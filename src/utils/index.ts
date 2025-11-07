import { Person } from '../types';

export const getSlug = (person: { name: string; born: number }): string => {
  return `${person.name.toLowerCase().replace(/\s/g, '-')}-${person.born}`;
};

export const getPersonByName = (
  people: Person[],
  name: string,
): Person | undefined => {
  return people.find(p => p.name === name);
};

export const augmentPeople = (
  people: Omit<Person, 'slug' | 'mother' | 'father'>[],
): Person[] => {
  const peopleMap = new Map<string, Person>();

  // 1. Create a map for quick lookup and assign slugs
  people.forEach(p => {
    // We cast to Person because we will augment it in the next step
    const augmentedPerson: Person = { ...p, slug: getSlug(p) } as Person;

    peopleMap.set(p.name, augmentedPerson);
  });

  // 2. Link parents and add mother/father properties
  return Array.from(peopleMap.values()).map(person => {
    const mother = person.motherName
      ? peopleMap.get(person.motherName)
      : undefined;
    const father = person.fatherName
      ? peopleMap.get(person.fatherName)
      : undefined;

    return {
      ...person,
      mother,
      father,
    };
  });
};
