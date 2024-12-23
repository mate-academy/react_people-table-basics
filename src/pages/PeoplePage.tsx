import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { linkParents } from '../services/people';
import { PersonLink } from '../components/PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [noPeople, setNoPeople] = useState(false);
  const { selectedPerson } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(res => {
        if (!res.length) {
          setNoPeople(true);
        }

        setPeople(linkParents(res));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeople ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            !error &&
            !!people.length && (
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
                        'has-background-warning':
                          person.slug === selectedPerson,
                      })}
                    >
                      <td>{<PersonLink person={person} />}</td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.mother ? (
                          <PersonLink person={person.mother} />
                        ) : (
                          person.motherName
                        )}
                      </td>
                      <td>
                        {person.father ? (
                          <PersonLink person={person.father} />
                        ) : (
                          person.fatherName
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      </div>
    </>
  );
};

PeoplePage.displayName = 'PeoplePage';
