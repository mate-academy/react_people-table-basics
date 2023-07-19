import React from 'react';
import { useParams } from 'react-router-dom';
import { TablePeople } from './TablePeople';
import { Person } from '../types/Person';
import { Loader } from './Loader';

type Props = {
  people: Person[],
  isLoading: boolean,
  isError: boolean,
};

export const PeoplePage: React.FC<Props> = ({
  isLoading, isError, people,
}) => {
  const { slug = '' } = useParams();

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0
            ? <TablePeople people={people} slug={slug} />
            : (!isLoading && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            )}
        </div>
      </div>
    </div>
  );
};
