import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useFetchPeople } from '../hooks/useFetchPeople';

export const PeoplePage = () => {
  const { people, isLoading, isError } = useFetchPeople();

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                people
                && people.map((person) => (
                  <tr data-cy="person">
                    <td>
                      <Link to={`/people/${person.slug}`}>{person.name}</Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>{`${person.father ?? '-'}`}</td>
                    <td>{`${person.mother ?? '-'}`}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
