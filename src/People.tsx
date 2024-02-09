import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './components/Loader';
import { getPeople } from './api';

import './App.scss';
import { Person } from './types';
import { PersonLink } from './PersonLink';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState(false);
  const [dataComes, setDataComes] = useState('');

  const { slug } = useParams();

  useEffect(() => {
    setloading(true);
    getPeople()
      .then((freshPeople) => {
        setPeople(freshPeople);
        if (freshPeople.length > 0) {
          setDataComes('Exist');
        } else {
          setDataComes('Empty');
        }
      })
      .catch((er) => {
        setErr(er);
        setDataComes('NO');
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  const existingPerson = (Name: string | null) => {
    if (Name === null) {
      return null;
    }

    const exPerson = people.find((per) => {
      if (per.name === Name) {
        return per;
      }

      return false;
    });

    return exPerson;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {err && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {dataComes === 'Empty' && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {dataComes === 'Exist' && (
            <table
              data-cy="peopleTable"
              className="table
                  is-striped is-hoverable is-narrow is-fullwidth"
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
                {people.map((person) => (
                  <tr
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        person.slug === slug,
                    })}
                  >
                    <td>
                      {existingPerson(person.name) ? (
                        <PersonLink person={person} />
                      ) : (
                        person.name
                      )}
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {(() => {
                        const { motherName } = person;

                        if (existingPerson(motherName)) {
                          return (
                            <PersonLink
                              person={existingPerson(motherName) as Person}
                            />
                          );
                        }

                        if (existingPerson(motherName) === null) {
                          return '-';
                        }

                        return motherName;
                      })()}
                    </td>
                    <td>
                      {(() => {
                        const { fatherName } = person;

                        if (existingPerson(fatherName)) {
                          return (
                            <PersonLink
                              person={existingPerson(fatherName) as Person}
                            />
                          );
                        }

                        if (existingPerson(fatherName) === null) {
                          return '-';
                        }

                        return fatherName;
                      })()}
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
