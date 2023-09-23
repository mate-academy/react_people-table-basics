import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople().then((data) => {
      setPeople(data);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong', error);
      setIsError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (people.length === 0) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
      <PeopleTable people={people} />
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {renderContent()}
        </div>
      </div>
    </>
  );
};
