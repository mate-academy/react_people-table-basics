import React from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { usePeople } from '../hooks/usePeople';
import { MESSAGES } from '../constants';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { peopleWithParents, isLoading, error } = usePeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!isLoading &&
            !error &&
            (peopleWithParents.length > 0 ? (
              <PeopleTable
                people={peopleWithParents}
                selectedPersonSlug={slug}
              />
            ) : (
              <p data-cy="noPeopleMessage">{MESSAGES.NO_PEOPLE}</p>
            ))}
        </div>
      </div>
    </>
  );
};
