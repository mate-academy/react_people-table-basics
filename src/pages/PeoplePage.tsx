import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

function PeoplePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        const preparedPeople = res.map(person => ({
          ...person,
          mother: res.find(mother => mother.name === person.motherName) || null,
          father: res.find(father => father.name === person.fatherName) || null,
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

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
                      key={person.slug}
                      className={
                        person?.slug === slug ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <Link
                          to={`../${person.slug}`}
                          className={
                            person?.sex === 'f' ? 'has-text-danger' : ''
                          }
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
                            to={`../${person.mother.slug}`}
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
                          <Link to={`../${person.father.slug}`}>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PeoplePage;
