import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');

  const getAllPeople = async () => {
    try {
      await getPeople()
        .then(result => setPeople(result.map((person: Person) => {
          const mother = result.find((mom: Person) => {
            return person.motherName === mom.name;
          });

          const father = result.find((dad: Person) => {
            return person.fatherName === dad.name;
          });

          return { ...person, mother, father };
        })));
    } catch {
      setError('Cannot load people');
    }
  };

  useEffect(() => {
    getAllPeople();
  }, []);

  return (
    <>
      {error.length === 0 ? (
        <div className="People__content">
          <h2 className="title is-2">People page</h2>
          <PeopleTable people={people} />
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </>
  );
};
