import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { findFather, findMother } from '../../store/functions';

export const People = () => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { personSlug } = useParams();

  const selectedPerson = personSlug;

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {errorMessage && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}

            {!people.length && !errorMessage && !loading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!!people.length && (
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

                    const personFather = findFather(person, people);
                    const personMother = findMother(person, people);

                    return (
                      <tr
                        key={slug}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': selectedPerson === slug,
                        })}
                      >
                        <td>
                          <Link
                            to={`${slug}`}
                            className={classNames({
                              'has-text-danger': sex === 'f',
                            })}
                          >
                            {name}
                          </Link>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        {personMother ? (
                          <td>
                            <Link
                              className="has-text-danger"
                              to={`${personMother.slug}`}
                            >
                              {personMother.name}
                            </Link>
                          </td>
                        ) : (
                          <td>{motherName ? motherName : '-'}</td>
                        )}
                        {personFather ? (
                          <td>
                            <Link to={`${personFather.slug}`}>
                              {personFather.name}
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
          </div>
        </div>
      </div>
    </main>
  );
};
