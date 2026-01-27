import { Loader } from './Loader';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  isLoading: boolean;
  error: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, isLoading, error }) => {
  const location = useLocation();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !error && people.length > 0 && (
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
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning':
                      location.pathname === `/people/${person.slug}`, //
                  })}
                >
                  <td>
                    <PersonLink
                      name={person.name}
                      sex={person.sex}
                      people={people}
                    />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {person.motherName ? (
                      <PersonLink
                        name={person.motherName}
                        sex="f"
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>

                  <td>
                    {person.fatherName ? (
                      <PersonLink
                        name={person.fatherName}
                        sex="m"
                        people={people}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
