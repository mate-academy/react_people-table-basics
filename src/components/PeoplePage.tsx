import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const downloadPeople = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setHasError(true);

        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    downloadPeople();
  }, []);

  let elementToRender;

  switch (true) {
    case (isLoading):
      elementToRender = (
        <Loader />
      );
      break;

    case (hasError):
      elementToRender = (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
      break;

    case (!people?.length):
      elementToRender = (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
      break;

    case (!!people?.length):
      elementToRender = (
        <PeopleTable
          people={people}
        />
      );
      break;

    default:
      break;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {elementToRender}
        </div>
      </div>
    </>
  );
};
