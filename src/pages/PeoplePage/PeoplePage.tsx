import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeoples)
      .catch(() => setShowError(true))
      .finally(() => setShowLoader(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {showLoader ? (
            <Loader />
          ) : (
            <>
              {showError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : (
                <>
                  {
                    peoples.length ? (
                      <PeopleTable peoples={peoples} />
                    ) : (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )
                  }
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
