import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { findPerson } from '../../services/findPerson';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { slug: personSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then(peopleData =>
        setPeople(
          peopleData.map(person => ({
            ...person,
            mother: findPerson(peopleData, person.motherName),
            father: findPerson(peopleData, person.fatherName),
          })),
        ),
      )
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="block">
        <h1 className="title">People Page</h1>
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !loading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                {people.map(person => {
                  const {
                    born,
                    died,
                    fatherName,
                    motherName,
                    sex,
                    slug,
                    mother,
                    father,
                  } = person;

                  return (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames({
                        'has-background-warning': slug === personSlug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          fatherName || '-'
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
  );
};
