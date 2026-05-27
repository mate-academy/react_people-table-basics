import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

function findParent(data: Person[] | null, name: string | null) {
  if (!data || !name) {
    return;
  }

  return data.find(person => person.name === name);
}

export function PeoplePage() {
  const [data, setData] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(res => {
        const aggregatePeople = res.map(person => {
          return {
            ...person,
            mother: findParent(res, person.motherName),
            father: findParent(res, person.fatherName),
          };
        });

        setData(aggregatePeople);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {data?.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {data?.length !== 0 && !isLoading && (
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
                {data?.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
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
                      {person.mother ? (
                        <Link
                          to={`/people/${person.mother.slug}`}
                          className="has-text-danger"
                        >
                          {person.mother.name}
                        </Link>
                      ) : (
                        person?.motherName || '-'
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <Link to={`/people/${person.father.slug}`}>
                          {person.father.name}
                        </Link>
                      ) : (
                        person?.fatherName || '-'
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
}
