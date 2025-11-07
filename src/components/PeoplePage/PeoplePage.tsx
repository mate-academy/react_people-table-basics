import React, { useEffect, useState } from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const highlightedPersonSlug: string | null = useParams()?.slug || null;
  const [loadingState, setLoadingState] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(function () {
    setLoadingState(true);
    getPeople()
      .then(res => {
        if (res !== null) {
          setPeople(res);
        }
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, []);

  return (
    <React.Fragment>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        <div className="block">
          {loadingState && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loadingState && !loadingError && (
            <PeopleTable
              people={people}
              highlightedPersonSlug={highlightedPersonSlug}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
