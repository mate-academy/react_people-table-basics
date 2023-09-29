import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { preparePeople } from '../helpers';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromAfar => setPeople(preparePeople(peopleFromAfar)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const hasPeople = !!people.length;
  const isRequestSuccessful = !isLoading && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isRequestSuccessful && (
            hasPeople
              ? <PeopleTable people={people} selected={slug} />
              : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
          )}
        </div>
      </div>
    </>
  );
};
