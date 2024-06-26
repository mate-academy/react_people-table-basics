import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setData)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const people: Person[] = data.map(person => ({
    ...person,
    mother: data.find(p => p.name === person.motherName),
    father: data.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length < 1 && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
