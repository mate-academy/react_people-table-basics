import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { peopleWithParentsInfo } from '../../helpers';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getPeople();

        const peopleFromServer = peopleWithParentsInfo(response);

        setPeople(peopleFromServer as Person[]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('Something went wrong');
      }
    };

    fetchData();
  }, []);

  const noPeopleMessage = !isLoading && !errorMessage && people.length === 0;
  const peopleTable = !isLoading && !errorMessage && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {noPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {peopleTable && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
