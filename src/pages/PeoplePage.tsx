import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(dataFromServer => {
        setPeople(dataFromServer);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoader(false);
      })
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {!isLoader && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>)
          }

          {!isLoader && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>)
          }

          {!isLoader && !error && people.length > 0 && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
