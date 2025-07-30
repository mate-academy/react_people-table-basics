import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';

type Props = {
  slug?: string;
};

export const PeopleList: React.FC<Props> = ({ slug }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeople(response);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="block">
          <h1 className="title">People Page</h1>
          <div className="box table-container">
            {loader ? (
              <Loader />
            ) : error ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : people.length === 0 ? (
              <p data-cy="noPeopleMessage" className="has-text-danger">
                There are no people on the server
              </p>
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
                  {people.map(person => {
                    const colorClass =
                      person.sex === 'm' ? '' : 'has-text-danger';

                    const mother = person.motherName
                      ? people.find(p => p.name === person.motherName)
                      : null;

                    const father = person.fatherName
                      ? people.find(p => p.name === person.fatherName)
                      : null;

                    return (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={
                          person.slug === slug ? 'has-background-warning' : ''
                        }
                      >
                        <td>
                          <Link
                            to={`/people/${person.slug}`}
                            className={colorClass}
                          >
                            {person.name}
                          </Link>
                        </td>
                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.motherName ? (
                            mother ? (
                              <Link
                                to={`/people/${mother.slug}`}
                                className={
                                  mother.sex === 'f' ? 'has-text-danger' : ''
                                }
                              >
                                {mother.name}
                              </Link>
                            ) : (
                              person.motherName
                            )
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {person.fatherName ? (
                            father ? (
                              <Link to={`/people/${father.slug}`}>
                                {father.name}
                              </Link>
                            ) : (
                              person.fatherName
                            )
                          ) : (
                            '-'
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
      </div>
    </main>
  );
};

{
  /* <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p> */
}

{
  /* <p data-cy="noPeopleMessage">There are no people on the server</p> */
}
