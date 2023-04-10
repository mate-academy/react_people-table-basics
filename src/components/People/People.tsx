import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonType } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const People: React.FC = () => {
  const match = useMatch('people/:slug');
  const selectedPersonSlug = match?.params.slug;

  const [people, setPeople] = useState<PersonType[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoPeople, setIsNoPeople] = useState(false);

  const loadPeople = async () => {
    setIsPeopleLoading(true);
    try {
      const loadedPeople = await getPeople();

      if (loadedPeople.length === 0) {
        setIsNoPeople(true);
      } else {
        setPeople(loadedPeople);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!isError && isPeopleLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && isNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && (
            <PeopleTable
              people={people}
              selectedPersonSlug={selectedPersonSlug || 'no-slug'}
            />
          )}
        </div>
      </div>
    </>
  );
};
