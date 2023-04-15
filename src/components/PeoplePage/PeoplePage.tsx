import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleList } from '../PeopleList/PeopleList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug = '' } = useParams();

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoader(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoader
            ? <Loader />
            : (
              <>
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </>
            )}

          {(!isError && !!people.length) && (
            <PeopleList people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
