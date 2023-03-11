import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const People: React.FC = () => {
  const [listPeople, setListPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((res: Person[]) => setListPeople(res))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {listPeople.length < 1 && !error
          ? <Loader />
          : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && listPeople.length < 1
                            && (
                              <p data-cy="noPeopleMessage">
                                There are no people on the server
                              </p>
                            )}

              {listPeople.length > 0
                            && (
                              <table
                                data-cy="peopleTable"
                                  className="
                                  table is-striped 
                                is-hoverable is-narrow is-fullwidth"
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
                                  {listPeople.map((person: Person) => {
                                    return (
                                      <tr data-cy="person" key={person.slug}>
                                        <td>
                                          <a href="#/people/jan-van-brussel-1714">
                                            {person.name}
                                          </a>
                                        </td>

                                        <td>{person.sex}</td>
                                        <td>{person.born}</td>
                                        <td>{person.died}</td>
                                        <td>{person.motherName}</td>
                                        <td>{person.fatherName}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            )}
            </>
          )}
      </div>
    </div>
  );
};
