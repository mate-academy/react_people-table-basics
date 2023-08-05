import { useContext } from 'react';

import { PeopleContext } from '../context/PeopleContext';

import { Loader, PersonList, ErrorNotification } from '../components';

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
