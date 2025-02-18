import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PersonsList } from './PersonsList';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople()
      .then(persons =>
        persons.map(person => ({
          ...person,
          mother: persons.find(mother => mother.name === person.motherName),
          father: persons.find(father => father.name === person.fatherName),
        })),
      )
      .then(setPeoples)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && !isLoading && !peoples.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!peoples.length && <PersonsList persons={peoples} />}
        </div>
      </div>
    </>
  );
};
