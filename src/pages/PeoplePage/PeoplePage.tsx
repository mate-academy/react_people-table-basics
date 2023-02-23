import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { PersonLink } from '../../components/PersonLink';
import { Person } from '../../types/Person';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [error, setError] = useState(false);

  const { currentPerson = 0 } = useParams();

  const loadPeople = async () => {
    try {
      const data = await getPeople();

      setPeople(data);
    } catch {
      setError(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isPersonIncludes = (name: string | null) => {
    return people.find(person => person.name === name) || null;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(people.length === 0 && !isPeopleLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
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
                  const mother = isPersonIncludes(person.motherName);
                  const father = isPersonIncludes(person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={cn({
                        'has-background-warning': person.slug === currentPerson,
                      })}
                    >
                      <td>
                        <PersonLink
                          person={person}
                        />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      {mother
                        ? (
                          <td>
                            <PersonLink
                              person={mother}
                            />
                          </td>
                        )
                        : (
                          <td>{person.motherName ? person.motherName : '-'}</td>
                        )}

                      {father
                        ? (
                          <td>
                            <PersonLink
                              person={father}
                            />
                          </td>
                        )
                        : (
                          <td>{person.fatherName ? person.fatherName : '-'}</td>
                        )}
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
