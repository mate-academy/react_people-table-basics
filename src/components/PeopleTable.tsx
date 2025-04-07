import { Loader } from './Loader';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';

interface Props {
  people: Person[];
  loading: boolean;
  errorMessage: string;
}

export const PeopleTable = ({ people, loading, errorMessage }: Props) => {
  const { personId } = useParams();

  const activePerson = people.find(person => person.slug === personId);

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {!loading && errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!loading && !errorMessage && !people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !errorMessage && (
          <>
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
                {people.map(person => {
                  return (
                    <PersonRow
                      person={person}
                      activePerson={activePerson}
                      key={person.slug}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
