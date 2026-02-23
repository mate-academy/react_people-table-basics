import { useEffect, useState, useMemo } from 'react';
import { Loader } from './components/Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from './types';
import { getPeople } from './api';
import { PersonWithParents } from './types/PersonWithParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const enrichedPeople: PersonWithParents[] = useMemo(() => {
    return people.map(person => ({
      ...person,
      motherPerson: people.find(p => p.name === person.motherName) || null,
      fatherPerson: people.find(p => p.name === person.fatherName) || null,
    }));
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {loading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!loading && !error && (
          <>
            {people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={enrichedPeople} />
            )}
          </>
        )}
      </div>
    </>
  );
};
