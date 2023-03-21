import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';
import { getPeopleWithParents } from '../utils';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();

  const getPeopleFromServer = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      if (peopleFromServer) {
        setPeople(getPeopleWithParents(peopleFromServer));
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <div className="block">
            <div className="box table-container">
              {people.length > 0 && <PeopleTable people={people} slug={slug} />}

              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
