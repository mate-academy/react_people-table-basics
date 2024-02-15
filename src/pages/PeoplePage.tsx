import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    getPeople()
      .then((data) => {
        const updatedPeople = data.map(person => {
          const mother = person.motherName
            ? data.find(p => p.name === person.motherName) : undefined;
          const father = person.fatherName
            ? data.find(p => p.name === person.fatherName) : undefined;

          return { ...person, mother, father };
        });

        setPeople(updatedPeople);
      })
      .catch(() => {
        setError(true);
      })
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

          {people?.length === 0 && !loading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loading && !!people?.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
