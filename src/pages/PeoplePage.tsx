import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/Loader/PersonLink';
import { Person } from '../types';
export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {!loading && !errorMessage && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {errorMessage && !loading && 
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            }

            {!loading && !errorMessage && <PersonLink people={people} />}
          </div>
        </div>
      </div>
    </div>
  );
};
