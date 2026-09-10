import { Link } from 'react-router-dom';

import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [database, setDatabase] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [urlActive, setUrlActive] = useState('');

  useEffect(() => {
    getPeople()
      .then(data => setDatabase(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <main className="section">
          <div className="container">
            <div className="block">
              <div className="box table-container">
                {isLoading && <Loader />}

                {error.length !== 0 && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {database.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable 
                  is-narrow is-fullwidth"
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
                    {database.map(person => {
                      return (
                        <tr
                          className={
                            urlActive === person.slug
                              ? 'has-background-warning'
                              : ''
                          }
                          data-cy="person"
                          key={person.slug}
                        >
                          <td>
                            <Link
                              className={
                                person.sex === 'f' ? 'has-text-danger' : ''
                              }
                              onClick={() => {
                                setUrlActive(person.slug);
                              }}
                              to={`/people/${person.slug}`}
                            >
                              {person.name}
                            </Link>
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>{person.motherName || '-'}</td>
                          <td>{person.fatherName || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default PeoplePage;
