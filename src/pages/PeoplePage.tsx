import { useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../store/PeopleContext';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage = () => {
  const { people, isLoading, error, loadPeople } = useContext(PeopleContext);
  const location = useLocation();

  useEffect(() => {
    loadPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

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

          {!isLoading && people.length > 0 && (
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
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        location.pathname === `/people/${person.slug}`,
                    })}
                    key={person.name}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <Link
                          to={`/people/${person.mother.slug}`}
                          className={classNames({
                            'has-text-danger': person.mother.sex === 'f',
                          })}
                        >
                          {person.mother.name}
                        </Link>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>

                    <td>
                      {person.father ? (
                        <Link to={`/people/${person.father.slug}`}>
                          {person.father.name}
                        </Link>
                      ) : (
                        person.fatherName || '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
