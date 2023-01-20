import { FC, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/Loader/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoading = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const peopleFromServer = await getPeople();

      setIsLoading(false);
      setPeople(peopleFromServer);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoading();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && (
            !people.length ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ) : (
              <PeopleTable people={people} />
            )
          )}
        </div>
      </div>
    </div>
  );
};
