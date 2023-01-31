import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PeoplePage: React.FC<Props> = ({ people }) => {
  const { personSlug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {people.length === 0 && (
            <Loader />
          )}

          {!people && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          <PeopleTable
            people={people}
            personSlug={personSlug}
          />
        </div>
      </div>
    </>
  );
};
