import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../Context';

export const PeoplePage: React.FC = () => {
  const { people, loader, loadingError } = useContext(PeopleContext);
  const tableMarkup = (
    <>
      {people.length === 0 && !loader ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <PeopleTable />
      )}
    </>
  );
  const peopleMarkup = (
    <>
      {loadingError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        tableMarkup
      )}
    </>
  );

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader ? <Loader /> : peopleMarkup}
        </div>
      </div>
    </>
  );
};
