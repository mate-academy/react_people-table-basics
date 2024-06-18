import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonList } from '../PersonList';

export const People: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, isLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    isLoading(true);
    setErrorMessage(false);
    getPeople()
      .then(fetchedPeoples =>
        fetchedPeoples.map(people => ({
          ...people,
          mother: fetchedPeoples.find(
            mother => mother.name === people.motherName,
          ),

          father: fetchedPeoples.find(
            father => father.name === people.fatherName,
          ),
        })),
      )
      .then(setPeoples)
      .catch(() => setErrorMessage(true))
      .finally(() => isLoading(false));
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

          {!peoples.length && !loading && !errorMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peoples.length > 0 && <PersonList peoples={peoples} />}
        </div>
      </div>
    </>
  );
};
