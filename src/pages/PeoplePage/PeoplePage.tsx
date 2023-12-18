import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { mappedPeople } from '../../utils/proceedPeople';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const displayPeopleTable = () => (
    !error && !isLoading && !!people.length
  );

  const fetchPeople = () => {
    setError(false);
    setPeople([]);
    setIsLoading(true);
    getPeople()
      .then((data) => {
        setPeople(mappedPeople(data));
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!error && !isLoading && !people.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {displayPeopleTable() && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
