import { Person } from '../types';

export function proceedPeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let newPeople = filterPeople(people, searchParams);

  const sortType = searchParams.get('sort');
  const order = searchParams.get('order') ? -1 : 1;

  if (sortType) {
    newPeople = sortPeople(newPeople, sortType, order);
  }

  return newPeople;
}

export function mappedPeople(people : Person[]) {
  return people.map((person) => {
    const editedPerson = { ...person };
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    if (mother) {
      editedPerson.mother = mother;
    }

    if (father) {
      editedPerson.father = father;
    }

    return editedPerson;
  });
}
