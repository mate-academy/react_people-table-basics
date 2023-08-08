import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug: slugParams } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(res => res.json())
      .then(gettedPeople => setPeople(gettedPeople.map((person: Person) => {
        const findedMother = gettedPeople
          .find((findMother: Person) => (
            person.motherName === findMother.name
          )) || null;

        const findedFather = gettedPeople
          .find((findFather: Person) => (
            person.fatherName === findFather.name
          )) || null;

        return { ...person, mother: findedMother, father: findedFather };
      })))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isError && !isLoading && people.length > 0 && (
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
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                    mother,
                    father,
                  } = person;

                  return (
                    <tr
                      key={name}
                      data-cy="person"
                      className={classNames(
                        {
                          'has-background-warning':
                            slugParams === person.slug,
                        },
                      )}
                    >
                      <td>
                        <a
                          className={classNames(
                            { 'has-text-danger': sex === 'f' },
                          )}
                          href={`#/people/${slug}`}
                        >
                          {name}
                        </a>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      {!motherName && (<td>-</td>)}

                      {motherName && !mother && (
                        <td>
                          {motherName}
                        </td>
                      )}

                      {motherName && mother && (
                        <td>
                          <a
                            className="has-text-danger"
                            href={`#/people/${mother.slug}`}
                          >
                            {motherName}
                          </a>
                        </td>
                      )}

                      {!fatherName && (<td>-</td>)}

                      {fatherName && !father && (
                        <td>
                          {fatherName}
                        </td>
                      )}

                      {fatherName && father && (
                        <td>
                          <a
                            href={`#/people/${father.slug}`}
                          >
                            {fatherName}
                          </a>
                        </td>
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
