import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [isPeopleError, setIsPeopleError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsPeopleLoading(true);
    setIsPeopleError(false);

    getPeople()
      .then(peopleList => setPeople(peopleList))
      .catch(() => setIsPeopleError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {isPeopleError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people && people.length
            ? (
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
                  {people.map((person: Person) => {
                    return (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={classNames({
                          'has-background-warning': person.slug === slug,
                        })}
                      >
                        <PersonLink
                          person={person}
                          people={people}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
            : people && !people.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
        </div>
      </div>
    </>
  );
};
