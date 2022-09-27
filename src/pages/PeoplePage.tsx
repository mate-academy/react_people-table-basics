import { useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { LoadingError, NoPeopleMessage } from '../components/LoadingError';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);

  const uploadPeople = async () => {
    try {
      const data = await getPeople();

      const visiblePeople = data.map(person => ({
        ...person,
        mother: data.find(
          mother => mother.name === person.motherName,
        ),
        father: data.find(
          father => father.name === person.fatherName,
        ),
      }));

      setPeople(visiblePeople);
    } catch (err) {
      setError(true);
    }
  };

  uploadPeople();

  return (
    <>
      <h1 className="title">People Page</h1>
      {(!people && !error) && <Loader />}

      {error && <LoadingError /> }

      {(people && people.length < 1) && <NoPeopleMessage /> }

      {people && <PeopleTable people={people} />}
    </>
  );
};
