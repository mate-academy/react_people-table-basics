import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader/Loader';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoaging] = useState(false);
  const [erorMesage, setErorMesage] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setLoaging(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErorMesage('Something went wrong');
      })
      .finally(() => setLoaging(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {erorMesage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {erorMesage}
            </p>
          )}

          {!people.length && !loading && !erorMesage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !loading && (
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
                    per => per.name === person.motherName,
                  );
                  const father = people.find(
                    per => per.name === person.fatherName,
                  );

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={cn({
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={cn({
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
                        {mother ? (
                          <Link
                            to={`/people/${mother.slug}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </Link>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <Link to={`/people/${father.slug}`}>
                            {person.fatherName}
                          </Link>
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
        </div>
      </div>
    </>
  );
};
