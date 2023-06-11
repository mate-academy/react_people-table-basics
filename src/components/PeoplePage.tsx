import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonalLink } from './PersonalLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams<{ slug: string }>();

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader />
            : (
              <>
                {!isLoading && hasError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}
                {!isLoading && !hasError && !people.length
            && (
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
                    {!isLoading && people.map(person => {
                      const {
                        sex,
                        born,
                        died,
                        fatherName,
                        motherName,
                        slug: PersonSlug,
                      } = person;

                      const foundMother = people
                        .find(mother => mother.name === motherName) || null;

                      const foundFather = people
                        .find(father => father.name === fatherName) || null;

                      return (
                        <tr
                          data-cy="person"
                          className={cn({
                            'has-background-warning':
                                slug === PersonSlug,
                          })}
                          key={PersonSlug}
                        >
                          <td>
                            <PersonalLink person={person} />
                          </td>
                          <td>{sex}</td>
                          <td>{born}</td>
                          <td>{died}</td>
                          <td>
                            { foundMother
                              ? <PersonalLink person={foundMother} />
                              : <p>{motherName || '-'}</p>}
                          </td>
                          <td>
                            { foundFather
                              ? <PersonalLink person={foundFather} />
                              : <p>{fatherName || '-'}</p>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
        </div>
      </div>
    </>
  );
};
