import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShownPeople, setIsShownPeople] = useState(false);
  const [shownError, setShownError] = useState('');

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setIsShownPeople(true);
        if (!data.length) {
          setShownError('There are no people on the server');
        }
      })
      .catch((error) => {
        setShownError('Something went wrong');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {shownError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {shownError}
          </p>
        )}

        {shownError && (
          <p data-cy="noPeopleMessage">
            {shownError}
          </p>
        )}

        {isShownPeople && <PeopleTable people={people} />}
      </div>
    </div>
  );
};
