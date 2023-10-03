import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonPage } from '../PersonPage/PersonPage';

type Props = {
  people: Person[],
  setPeople: (newValue: Person[]) => void,
};

export const PeoplePage: React.FC<Props> = ({ setPeople, people }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isDisplayErrorMessage = isError && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !isError;
  const isPeopleOnServer = !!people.length && !isError;

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isDisplayErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleOnServer && (
            <PersonPage people={people} />
          )}
        </div>
      </div>
    </>
  );
};
