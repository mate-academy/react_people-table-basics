/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../store/PeopleConetxt';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { peopleList, isLoading, errorMessage } = useContext(PeopleContext);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {
            isLoading ? (
              <Loader />
            ) : peopleList.length > 0 ? (
              <PeopleTable />
            ) : (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
          }

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
