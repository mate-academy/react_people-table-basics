import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonList } from '../../components/PersonList/PersonList';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<null | Person[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPersons)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error.message);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError
            ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )
            : (persons && <PersonList persons={persons} />)}
        </div>
      </div>
    </>
  );
};
