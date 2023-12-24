import { useEffect } from 'react';
import { getPeople } from '../../api';
import { usePeoplePageContext }
  from '../../pages/PeoplePage/PeoplePageContext/PeoplePageContext';
import { Loader } from '../Loader';
import { Person } from '../Person';
import { PeopleLoadingError } from '../PeopleLoadingError';
import { NoPeopleOnServer } from '../NoPeopleOnServer';

export const PeopleTable: React.FC = () => {
  const {
    people,
    loading,
    setLoading,
    setError,
    setPeople,
    error,
  } = usePeoplePageContext();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const succesfulPeopleRender = !loading && !error;
  const appiSendNoPeople = !people.length && !loading;

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}
        {error && <PeopleLoadingError />}
        {appiSendNoPeople && <NoPeopleOnServer />}
        {succesfulPeopleRender && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
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

            <tbody>
              {people.map(person => (
                <Person
                  key={person.slug}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
