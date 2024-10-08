import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import PeopleTable from './PeopleTable';
import ErrorMessage from './ErrorMessage';
import NotPeople from './NotPeople';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    getPeople()
      .then(data => {
        if (isMounted) {
          setPeople(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <ErrorMessage />
          ) : !people?.length ? (
            <NotPeople />
          ) : (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
