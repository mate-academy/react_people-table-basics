import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader/Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [arePeopleLoaded, setArePeopleLoaded] = useState(false);
  const [wasLoadingSuccessful, setWasLoadingSuccessful] = useState(false);

  useEffect(() => {
    setArePeopleLoaded(false);
    getPeople()
      .then((loadedPeople) => {
        setPeople(loadedPeople);
        setWasLoadingSuccessful(true);
      })
      .catch(() => setWasLoadingSuccessful(false))
      .finally(() => setArePeopleLoaded(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!arePeopleLoaded && <Loader />}

          {!wasLoadingSuccessful
            && arePeopleLoaded
            && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

          {wasLoadingSuccessful
            && Boolean(!people.length)
            && (
              <p
                data-cy="noPeopleMessage"
              >
                There are no people on the server
              </p>
            )}

          {Boolean(people.length) && <PeopleTable people={people} />}

        </div>
      </div>
    </>
  );
};
