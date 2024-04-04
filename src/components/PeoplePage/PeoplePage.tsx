import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import cn from 'classnames';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const showNoPeopleMessage = !people.length && !errorMessage && !loading;
  const showPeopleTable = !loading && !errorMessage && people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {showNoPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {showPeopleTable && (
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
                    key={person.name}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <Link
                        className={cn({
                          'has-text-danger': person.sex === 'f',
                        })}
                        to={`/people/${person.slug}`}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    {people.find(human => human.name === person.motherName) ? (
                      <td>
                        <Link
                          to={`/people/${people.find(human => human.name === person.motherName)?.slug}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      </td>
                    ) : (
                      <td>{person.motherName ? person.motherName : '-'}</td>
                    )}
                    {people.find(human => human.name === person.fatherName) ? (
                      <td>
                        <Link
                          to={`/people/${people.find(human => human.name === person.fatherName)?.slug}`}
                        >
                          {person.fatherName}
                        </Link>
                      </td>
                    ) : (
                      <td>{person.fatherName ? person.fatherName : '-'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
