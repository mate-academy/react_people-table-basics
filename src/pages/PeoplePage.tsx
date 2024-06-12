import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { PeopleContext } from '../store/PeopleContext';
import classNames from 'classnames';
import { Link, Outlet, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { isLoading, people, errorMessage } = useContext(PeopleContext);
  const getParent = (name: string) => {
    return people.find(person => person.name === name);
  };

  const param = useParams();
  const tabId = param ? `${param.tabId}` : 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !errorMessage && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && !isLoading && (
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
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                  } = person;

                  const motherPerson = motherName? getParent(motherName) : null;
                  const fatherPerson = fatherName ? getParent(fatherName) : null;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': tabId === person.slug,
                      })}
                    >
                      <td>
                        <Link
                          className={classNames({
                            'has-text-danger': sex === 'f',
                          })}
                          to={`/people/${slug}`}
                        >
                          {name}
                        </Link>
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      {motherName && motherPerson ? (
                        <td>
                          <Link
                            className="has-text-danger"
                            to={`/people/${motherPerson.slug}`}
                          >
                            {motherName}
                          </Link>
                        </td>
                      ) : (
                        <td>{motherName ? motherName : '-'}</td>
                      )}

                      {fatherName && fatherPerson ? (
                        <td>
                          <Link to={`/people/${fatherPerson.slug}`}>
                            {fatherName}
                          </Link>
                        </td>
                      ) : (
                        <td>{fatherName ? fatherName : '-'}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <Outlet />
        </div>
      </div>
    </>
  );
};
