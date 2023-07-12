import { FC, useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isThereNoPeople, setIsThereNoPeople] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsThereNoPeople(false);

    getPeople()
      .then(item => {
        if (!item.length) {
          setIsThereNoPeople(true);
        }

        setPeopleFromServer(item);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      {!isError && !isThereNoPeople && (
        <PeopleTable
          people={peopleFromServer}
          isLoading={isLoading}
        />
      )}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </div>
  );
};
