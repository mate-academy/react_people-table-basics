import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import classNames from 'classnames';
import { transformPeopleData } from '../../helpers/transformPeopleData';
import { PersonLink } from '../../components/PersonLink/PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { slug: slugParams } = useParams<{ slug: string }>();

  const loadPeople = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = transformPeopleData(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {people?.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {people && (
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
                      sex,
                      fatherName,
                      motherName,
                      slug,
                      father,
                      mother,
                    } = person;

                    return (
                      <tr
                        key={slug}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': slug === slugParams,
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
                            <>{motherName ? motherName : '-'}</>
                          )}
                        </td>

                        <td>
                          {father ? (
                            <PersonLink person={father} />
                          ) : (
                            <>{fatherName ? fatherName : '-'}</>
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
