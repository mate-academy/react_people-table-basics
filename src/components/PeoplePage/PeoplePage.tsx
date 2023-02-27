import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getPeopleParents } from '../../utils/getPeopleParents';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const peopleMesageError = !isLoading && !fetchError && !people.length;
  const isPeople = !isLoading && !!people.length;

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();
      const preparetedPeople = getPeopleParents(peopleFromServer);

      setPeople(preparetedPeople);
    } catch {
      setFetchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {fetchError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleMesageError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeople && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
