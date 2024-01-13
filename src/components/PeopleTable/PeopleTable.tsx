import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import { useTableProvider } from '../../context/TableContext';

export const PeopleTable = () => {
  const { people, isLoading, showError } = useTableProvider();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {showError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

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
            {
              people.map(person => (
                <PersonLink key={person.slug} person={person} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
