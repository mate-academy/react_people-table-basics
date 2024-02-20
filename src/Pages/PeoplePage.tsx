import { useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleContex } from '../store/PeopleContex';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const {
    people, setPeople, setErrorMassage, errorMassage, setLoading, loading,
  } = useContext(PeopleContex);

  useEffect(() => {
    setLoading(true);

    getPeople().then(setPeople)
      .catch(() => {
        setErrorMassage(true);
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {(loading && people?.length !== 0) ? <Loader /> : (
            people && people.length > 0 && !loading) && (
            <table
              data-cy="peopleTable"
              className="table is-striped
              is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <PeopleTable people={people} />

            </table>
          ) }

          {(people?.length === 0 && !loading) && (
            <p data-cy="noPeopleMessage" className="has-text-danger">
              There are now people
            </p>
          )}

          {(errorMassage && !loading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

        </div>
      </div>
    </div>
  );
};
