import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  // eslint-disable-next-line max-len
  const API = 'https://mate-academy.github.io/react_people-table/api/people.json';

  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(peopleFromServer => setPeople(peopleFromServer));
  }, []);

  return (
    people && <PeopleTable people={people} />
  );
};
