import classNames from 'classnames';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople().then(setPeople).catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const getParent = (parentName: string | null) => {
    if (parentName && people) {
      return people.find(person => person.name === parentName);
    }

    return undefined;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {error && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}
          {isLoading
            ? (<Loader />)
            : (
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
                  {people?.length !== 0
                    ? people?.map(person => (
                      <>
                        <tr
                          data-cy="person"
                          key={person.slug}
                          className={classNames({
                            // eslint-disable-next-line max-len
                            'has-background-warning': person.slug === personSlug,
                          })}
                        >
                          <td>
                            <PersonLink person={person} />
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>
                            {getParent(person.motherName) && (
                              <PersonLink
                                person={{
                                  ...person,
                                  mother: getParent(person.motherName),
                                }.mother}
                              />
                            )}
                            {person.motherName ? person.motherName : '-'}
                          </td>
                          <td>
                            {getParent(person.fatherName) && (
                              <PersonLink
                                person={{
                                  ...person,
                                  father: getParent(person.fatherName),
                                }.father}
                              />
                            )}
                            {person.fatherName ? person.fatherName : '-'}
                          </td>
                        </tr>
                      </>
                    ))
                    : (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}
                </tbody>
              </table>
            )}

        </div>
      </div>
    </>
  );
};
