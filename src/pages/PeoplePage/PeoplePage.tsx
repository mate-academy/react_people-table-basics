import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

type Props = {
  people: Person[],
  isError: boolean,
  isLoading: boolean,
};

export const PeoplePage: React.FC<Props> = React.memo(
  ({ people, isError, isLoading }) => {
    const { slug = '' } = useParams();

    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {isLoading
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

            {people.length && (
              <PeopleTable people={people} selectedSlug={slug} />
            )}
          </div>
        </div>
      </>
    );
  },
);
