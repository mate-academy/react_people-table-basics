import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleList } from '../components/PeopleList';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const fetchPeople = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {loadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length ? (
            !loadError && !isLoading && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          ) : (
            <PeopleList
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};
