import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../components/PersonLink/PersonLink';

function getPeopleWithParents(people: Person[]) {
  const peopleWithParents = [...people].map(person => {
    const child = { ...person };

    const mother = people.find(parent => parent.name === person.motherName);

    if (mother) {
      child.mother = mother;
    }

    child.motherName = child.motherName ? child.motherName : '-';

    const father = people.find(parent => parent.name === person.fatherName);

    if (mother) {
      child.father = father;
    }

    child.fatherName = child.fatherName ? child.fatherName : '-';

    return child;
  });

  return peopleWithParents;
}

export const PeoplePage = () => {
  const { personSlug } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const people = useMemo(
    () => getPeopleWithParents(peopleFromServer),
    [peopleFromServer],
  );

  useEffect(() => {
    setIsDataLoaded(false);
    setisError(false);
    setIsLoading(true);

    getPeople()
      .then(loadedPeople => {
        setPeopleFromServer(loadedPeople);
        setIsDataLoaded(true);
      })
      .catch(() => {
        setisError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isDataLoaded && (
            <>
              {people.length > 0 ? (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
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
                        sex,
                        slug,
                        fatherName,
                        father,
                        motherName,
                        mother,
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
                            {motherName && mother ? (
                              <PersonLink person={mother} />
                            ) : (
                              motherName
                            )}
                          </td>
                          <td>
                            {fatherName && father ? (
                              <PersonLink person={father} />
                            ) : (
                              fatherName
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
