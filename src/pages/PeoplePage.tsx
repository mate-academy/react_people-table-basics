import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import type { Person } from '../types';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      getPeople()
        .then(setPeople)
        .catch(() => {
          setError(true);
        });
    }, 1000);
  }, []);

  return (
    <div className="block">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && people === null && <Loader />}

          {!error && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!error && people && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </div>
  );
};
