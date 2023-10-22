import { useContext } from 'react';
import { Loader } from '../Loader';
import { appContext } from '../../storage/AppContext/AppContext';
import { PeopleTable } from './PeopleTable';

export const PeopleContent = () => {
  const { people, isLoading, error } = useContext(appContext);

  return (
    <>
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!people.length && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!!people.length && <PeopleTable />}
      </div>
    </>
  );
};
