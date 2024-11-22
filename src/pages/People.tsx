import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../store/PeopleContent';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const People: React.FC = () => {
  const { people, setPeopleLoader, setPeople, peopleLoader } =
    useContext(PeopleContext);
  // const [hidePeople, setHidePeople] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
    setPeopleLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setPeopleLoader(false);
      });
  }, [setPeople, setPeopleLoader, setErrorMessage]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!peopleLoader && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {peopleLoader && <Loader />}

          {!people.length && !peopleLoader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !peopleLoader && <PeopleTable />}
        </div>
      </div>
    </>
  );
};
