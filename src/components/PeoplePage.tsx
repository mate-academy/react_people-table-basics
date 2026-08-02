import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} activePerson={slug} />
          )}
        </div>
      </div>
    </>
  );
};
