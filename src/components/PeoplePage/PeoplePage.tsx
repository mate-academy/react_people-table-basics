import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isFetchError, setFetchError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const peopleFromServer = await getPeople();
      const preparedPeople = getPreparedPeople(peopleFromServer);

      setPeople(preparedPeople);
    } catch (err) {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const isPeopleVisible = !isLoading && Boolean(people.length);
  const isNoPeopleMessageVisible = !isLoading && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isFetchError
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleVisible && (
            <PeopleTable people={people} />
          )}

          {isNoPeopleMessageVisible && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
