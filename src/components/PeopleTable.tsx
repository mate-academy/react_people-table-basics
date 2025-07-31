import { Loader } from './Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  isLoading: boolean;
  people: Person[];
  hasError: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  isLoading,
  people,
  hasError,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                    const mother = people.find(
                      p => p.name === person.motherName,
                    );
                    const father = people.find(
                      p => p.name === person.fatherName,
                    );

                    return (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames({
                          'has-background-warning': pathname.endsWith(
                            `/${person.slug}`,
                          ),
                        })}
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {mother ? (
                            <PersonLink person={mother} />
                          ) : (
                            person.motherName || '-'
                          )}
                        </td>
                        <td>
                          {father ? (
                            <PersonLink person={father} />
                          ) : (
                            person.fatherName || '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};
