import { Loader } from '../Loader';
import { useTable } from '../../hooks/useTable';
import { ListOfPeople } from '../ListOfPerson/ListOfPerson';

export const Table = () => {
  const { isLoading, isError, isEmptyPeople, slugFromParam, visiblePeople } =
    useTable();

  return (
    <>
      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isEmptyPeople && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
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
            <ListOfPeople
              slugFromParam={slugFromParam}
              visiblePeople={visiblePeople}
            />
          </tbody>
        </table>
      )}
    </>
  );
};
