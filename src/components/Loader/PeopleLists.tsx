import { Person } from '../../types';
import { Loader } from './Loader';
import { PeopleItem } from './PeopleItems';

type PeoplePageProps = {
  people: Person[];
  error: boolean;
  loadingPeople: boolean;
};

export const PeopleList: React.FC<PeoplePageProps> = ({
  loadingPeople,
  error,
  people,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {loadingPeople === false && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {loadingPeople ? (
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
              {people.map((person: Person) => (
                <PeopleItem key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
