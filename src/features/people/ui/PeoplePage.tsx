import React from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../../shared/ui/Loader/Loader';
import { PeopleTable } from './PeopleTable';
import { usePeople } from '../hooks/usePeople';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { people, isLoading, isError } = usePeople();

  const hasPeople = !isLoading && !isError && people.length > 0;

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

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {hasPeople && <PeopleTable people={people} selectedSlug={slug} />}
        </div>
      </div>
    </>
  );
};
