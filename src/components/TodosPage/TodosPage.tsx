import { Link, useParams } from 'react-router-dom';
import {
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { ROUTES } from '../../Variables';
import { ParentLink } from '../ParentLink/ParentLink';

export const TodosPage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { activePerson } = useParams();

  const isReadyToShow = !isLoading && !isError;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        setPeople(res);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">

      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError
            && !isLoading
            && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

          {isReadyToShow && (
            <>
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <table
                  data-cy="peopleTable"
                  className="
    table is-striped
    is-hoverable
    is-narrow
    is-fullwidth"
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
                          /* eslint-disable-next-line */
                          'has-background-warning': activePerson === person.slug,
                        })}
                      >
                        <td>
                          <Link
                            to={`${ROUTES.people}/${person.slug}`}
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
                        {person.motherName ? (
                          <ParentLink
                            people={people}
                            name={person.motherName}
                            sex="f"
                          />
                        ) : (
                          <td>
                            -
                          </td>
                        )}
                        {person.fatherName ? (
                          <ParentLink
                            people={people}
                            name={person.fatherName}
                            sex="m"
                          />
                        ) : (
                          <td>
                            -
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
