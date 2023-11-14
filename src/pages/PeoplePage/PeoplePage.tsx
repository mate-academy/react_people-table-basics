import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

const preparePeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(pers => pers.name === person.motherName);
    const father = people.find(pers => pers.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((response) => {
        setPeople(preparePeople(response));
      })
      .catch(() => {setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
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
                    className={classNames({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <Link
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                        to={`../${person.slug}`}
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
                          className="has-text-danger"
                          to={`../${person.mother.slug}`}
                        >
                          {person.motherName}
                        </Link>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>

                    <td>
                      {person.father ? (
                        <Link to={`../${person.father.slug}`}>
                          {person.fatherName}
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
    </>
  );
};
