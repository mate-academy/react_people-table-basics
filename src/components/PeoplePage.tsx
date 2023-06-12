import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader/Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [peopleLoaded, setPeopleLoaded] = useState(false);

  useEffect(() => {
    setIsLoadingFinished(false);
    getPeople()
      .then((loadedPeople) => {
        setPeople(loadedPeople);
        setPeopleLoaded(true);
      })
      .catch(() => setPeopleLoaded(false))
      .finally(() => setIsLoadingFinished(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isLoadingFinished && <Loader />}

          {!peopleLoaded
            && isLoadingFinished
            && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

          {peopleLoaded
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
