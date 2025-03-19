import { Person } from '../types';
import { Outlet } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

type Props = {
  people: Person[] | undefined;
  loading: boolean;
  error: boolean;
};

export const PeoplePage: React.FC<Props> = ({ people, loading, error }) => {
  const peopleWithParents = people?.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      {!loading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!loading && !error && people?.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!loading && !error && people?.length !== 0 && (
        <div className="block">
          <div className="box table-container">
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
                {peopleWithParents?.map(person => (
                  <PersonLink person={person} key={person.name} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};
