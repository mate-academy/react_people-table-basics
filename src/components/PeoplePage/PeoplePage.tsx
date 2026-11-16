import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

import { useState, useEffect } from 'react';
import { Person } from '../../types';

import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug);

  return (
    <>
      <h1>People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !hasError && people.length > 0 && (
            <PeopleTable people={people} selectedPerson={selectedPerson}/>
          )}
        </div>
      </div>
    </>
  );
};
