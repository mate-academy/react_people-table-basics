import { useState } from 'react';
import { Route } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import PeopleList from '../../components/PeopleList';

export const PeoplPage = () => {
  const [onLoad, setOnLoad] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [peopleLength, setPeopleLength] = useState(1);

  const warning = onLoad || serverError || peopleLength === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
            <PeopleList
              setOnLoad={setOnLoad}
              setServerError={setServerError}
              setPeopleLength={setPeopleLength}
            />
          </>
        )}
      {warning
        && (
          <div className="block">
            <div className="box table-container">
              {onLoad && <Loader />}

              {serverError
                && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}
              {peopleLength === 0
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

            </div>
          </div>
        )}
    </>
  );
};
