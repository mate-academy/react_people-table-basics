import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeFullPeopleInfo = (peopleParams: Person[]) => {
    const convertedPeopleObjects = peopleParams.reduce<Record<string, Person>>(
      (acc, person) => {
        return {
          ...acc,
          [person.name]: person,
        };
      },
      {},
    );

    return peopleParams.map(person => {
      return {
        ...person,
        mother: person.motherName
          ? convertedPeopleObjects[person.motherName]
          : null,
        father: person.fatherName
          ? convertedPeopleObjects[person.fatherName]
          : null,
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(person => setPeople(makeFullPeopleInfo(person)))
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !error && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!error && !loading && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
