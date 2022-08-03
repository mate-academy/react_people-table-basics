import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((loadedPeople) => {
        const preparedPeople = [...loadedPeople].map(person => ({
          ...person,
          mother: loadedPeople
            .find(loadPerson => loadPerson.name === person.motherName) || null,
          father: loadedPeople
            .find(loadPerson => loadPerson.name === person.fatherName) || null,
        }));

        setPeople(preparedPeople);
      });
  }, []);

  return (
    <>
      <h1 className="title has-text-centered mt-5">People Page</h1>
      <PeopleTable people={people} />
    </>
  );
};
