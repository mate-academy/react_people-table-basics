import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleLink } from '../PeopleLink/PeopleLink';
import { getPeople } from '../../api';

export const PeopleTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [peoples, setPeoples] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);

  const { selectedSlug } = useParams();

  const initialLoad = async () => {
    setIsLoading(true);
    try {
      setPeoples(await getPeople());
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading
          ? <Loader />
          : (
            <>
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!peoples.length
                ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )
                : (
                  <table
                    data-cy="peopleTable"
                    className={classNames(
                      'table',
                      'is-striped',
                      'is-hoverable',
                      'is-narrow',
                      'is-fullwidth',
                    )}
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
                      {peoples.map(person => {
                        const {
                          sex,
                          born,
                          died,
                          motherName,
                          fatherName,
                          slug,
                        } = person;

                        const father: Person | undefined = peoples.find(
                          human => human.name === fatherName,
                        );

                        const mother: Person | undefined = peoples.find(
                          human => human.name === motherName,
                        );

                        return (
                          <tr
                            key={slug}
                            data-cy="person"
                            className={classNames(
                              {
                                'has-background-warning': slug === selectedSlug,
                              },
                            )}
                          >
                            <td>
                              <PeopleLink person={person} />
                            </td>

                            <td>{sex}</td>
                            <td>{born}</td>
                            <td>{died}</td>
                            <td>
                              {mother
                                ? <PeopleLink person={mother as Person} />
                                : motherName || '-'}
                            </td>
                            <td>
                              {father
                                ? <PeopleLink person={father as Person} />
                                : fatherName || '-'}
                            </td>
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
