import { Loader } from './Loader';
import { getPeople } from '../api';
import React, { useEffect } from 'react';
import { Person } from '../types';
import PersonLink from './PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

const PeoplePage = () => {
  const [people, setPeople] = React.useState<Person[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const searchPeopleByName = (name: string | null) => {
    return people?.find(
      person => person.name.toLowerCase() === name?.toLowerCase(),
    );
  };

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {loading && <Loader />}

            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!error && !loading && (
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
                  {people?.map(person => (
                    <tr
                      data-cy="person"
                      key={person.name}
                      className={classNames('', {
                        'has-background-warning': slug === person.slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {searchPeopleByName(person.motherName) ? (
                          <PersonLink
                            person={searchPeopleByName(person.motherName)}
                          />
                        ) : (
                          <span>
                            {person.motherName ? `${person.motherName}` : '-'}
                          </span>
                        )}
                      </td>

                      <td>
                        {searchPeopleByName(person.fatherName) ? (
                          <PersonLink
                            person={searchPeopleByName(person.fatherName)}
                          />
                        ) : (
                          <span>
                            {person.fatherName ? `${person.fatherName}` : '-'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
