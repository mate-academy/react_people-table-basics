/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getPeople } from './getPeople';
import { Person } from './type';
import { PeopleTable } from './PeopleTable';

const urlPeople
= 'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeoplePage = () => {
  const [people, setPeople] = useState <Person[]>([]);

  useEffect(() => {
    getPeople(urlPeople)
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
      });
  }, []);

  return (
    <PeopleTable people={people} />
  );
};
