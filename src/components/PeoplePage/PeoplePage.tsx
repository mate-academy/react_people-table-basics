import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<null | Person[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : isLoading ? (
          <Loader />
        ) : people?.length === 0 ? (
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
              {people?.map(p => {
                const father = people.find(
                  person => person.name === p.fatherName,
                );
                const mother = people.find(
                  person => person.name === p.motherName,
                );

                return (
                  <tr
                    key={p.slug}
                    data-cy="person"
                    className={slug === p.slug ? 'has-background-warning' : ''}
                  >
                    <td>
                      {p.sex === 'f' ? (
                        <Link
                          to={`/people/${p.slug}`}
                          className="has-text-danger"
                        >
                          {p.name}
                        </Link>
                      ) : (
                        <Link to={`/people/${p.slug}`}>{p.name}</Link>
                      )}
                    </td>

                    <td>{p.sex}</td>
                    <td>{p.born}</td>
                    <td>{p.died}</td>

                    <td>
                      {!p.motherName ? (
                        '-'
                      ) : mother ? (
                        <Link
                          className="has-text-danger"
                          to={`/people/${mother.slug}`}
                        >
                          {p.motherName}
                        </Link>
                      ) : (
                        p.motherName
                      )}
                    </td>

                    <td>
                      {!p.fatherName ? (
                        '-'
                      ) : father ? (
                        <Link to={`/people/${father.slug}`}>
                          {p.fatherName}
                        </Link>
                      ) : (
                        p.fatherName
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
  );
};
