import { useLocation } from 'react-router-dom';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { Person } from '../../types';

interface PeopleTableProps {
  people: Person[];
  isLoading: boolean;
  error: boolean;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  isLoading,
  error,
}) => {
  const location = useLocation();

  return (
    <div className="block">
      <div className="box table-container">
        {people.length === 0 && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
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
              {people.map(person => {
                const mother =
                  people.find(p => p.name === person.motherName) || null;
                const father =
                  people.find(p => p.name === person.fatherName) || null;

                return (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        location.pathname === `/people/${person.slug}`,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? (
                        mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          <span>{person.motherName}</span>
                        )
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      {person.fatherName ? (
                        father ? (
                          <PersonLink person={father} />
                        ) : (
                          <span>{person.fatherName}</span>
                        )
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
