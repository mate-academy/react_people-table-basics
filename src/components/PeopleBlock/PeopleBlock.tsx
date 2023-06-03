import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

enum Error {
  NO = 'no error',
  SERVER = 'server error',
  NOPEOPLE = 'no people in server',
}

export const PeopleTable = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(Error.NO);
  const { slug = '' } = useParams();

  const loadPeople = async () => {
    setIsLoading(true);

    const people = await getPeople().catch(() => setError(Error.SERVER));

    if (people) {
      if (people.length === 0) {
        setError(Error.NOPEOPLE);
      }

      setVisiblePeople(people);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error === Error.SERVER && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {error === Error.NOPEOPLE && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            {visiblePeople.length > 0 && (
              <>
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
                  {visiblePeople.map(people => (
                    <tr
                      data-cy="person"
                      className={classNames(
                        { 'has-background-warning': slug === people.slug },
                      )}
                    >
                      <td>
                        <PersonLink
                          people={visiblePeople}
                          personName={people.name}
                        />
                      </td>

                      <td>{people.sex}</td>
                      <td>{people.born}</td>
                      <td>{people.died}</td>
                      <td>
                        {people.motherName ? (
                          <PersonLink
                            people={visiblePeople}
                            personName={people.motherName}
                          />
                        ) : ('-')}
                      </td>
                      <td>
                        {people.fatherName ? (
                          <PersonLink
                            people={visiblePeople}
                            personName={people.fatherName}
                          />
                        ) : ('-')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
};
