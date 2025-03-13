import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<null | Person[]>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setLoading(true);
    getPeople()
      .then(r => setPeoples(r))
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const addedParents = useMemo(() => {
    if (!peoples) {
      return peoples;
    }

    return peoples.map(people => {
      const mother = peoples.find(p => p.name === people.motherName);
      const father = peoples.find(p => p.name === people.fatherName);

      const result = { ...people };

      if (mother) {
        result.mother = mother;
      }

      if (father) {
        result.father = father;
      }

      return result;
    });
  }, [peoples]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {!loading && (
            <>
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {addedParents && addedParents.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {addedParents && addedParents.length > 0 && (
                <PeopleTable peoples={addedParents} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
