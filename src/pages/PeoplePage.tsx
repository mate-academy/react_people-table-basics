import { useContext } from 'react';

import { PeopleContext } from '../context/PeopleContext';

import { Loader } from '../components/Loader';
import { PersonList } from '../components/PersonList';
import { ErrorNotification } from '../components/ErrorNotification';

export const PeoplePage = () => {
  const { loading, errorMessage } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? <Loader /> : (
            <>
              {errorMessage && <ErrorNotification />}

              {!errorMessage && <PersonList />}
            </>
          )}
        </div>
      </div>
    </>
  );
};
