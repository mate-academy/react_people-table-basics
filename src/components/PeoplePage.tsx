import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader/Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [werePeopleLoaded, setWerePeopleLoaded] = useState(false);

  useEffect(() => {
    setIsLoadingFinished(false);
    getPeople()
      .then((loadedPeople) => {
        setPeople(loadedPeople);
        setWerePeopleLoaded(true);
      })
      .catch(() => setWerePeopleLoaded(false))
      .finally(() => setIsLoadingFinished(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isLoadingFinished && <Loader />}

          {!werePeopleLoaded
            && isLoadingFinished
            && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

          {werePeopleLoaded
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
