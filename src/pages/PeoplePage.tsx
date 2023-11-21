import { useContext, useEffect } from 'react';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { PeopleContext } from '../stores/PeopleContext';
import { Loader } from '../components/Loader';

export const PersonPage = () => {
  const {
    peoplE,
    loading,
    messageNotHasPeople,
    errorMessage,
    loadPeople,
  } = useContext(PeopleContext);

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {
            messageNotHasPeople && (
              <p data-cy="noPeopleMessage">
                {messageNotHasPeople}
              </p>
            )
          }

          {errorMessage && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {errorMessage}
            </p>
          )}

          {
            !loading && !messageNotHasPeople && !errorMessage && (
              <PeopleTable people={peoplE} />
            )
          }
        </div>
      </div>
    </>
  );
};
