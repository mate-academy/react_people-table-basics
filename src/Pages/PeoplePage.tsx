import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage = () => {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isErrorExist, setIsErrorExist] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data))
      .catch(() => setIsErrorExist(true))
      .finally(() => setIsLoaderActive(false));
  }, []);

  const getParent = (parentName: string | null) => {
    return people.find((parent) => parent.name === parentName);
  };

  const isPeopleNotExist = !isLoaderActive && people.length === 0;
  const isContentLoad = !isLoaderActive && people.length;
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoaderActive && <Loader />}

          {isErrorExist && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleNotExist && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isContentLoad && (
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
                {people.map((person) => {
                  const mother = getParent(person.motherName);
                  const father = getParent(person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      className={cn({
                        'has-background-warning': person.slug === slug,
                      })}
                      key={person.name}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {father ? (
                          <PersonLink person={father} />
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
