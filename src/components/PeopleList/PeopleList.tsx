import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../Person/Person';

export const PeopleList: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      setLoadingError(false);

      setPeople(await getPeople());

      setIsLoading(false);
    } catch (error) {
      setLoadingError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      {loadingError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        <>
          <h1 className="title">People Page</h1>

          <div className="block">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {!people.length && !isLoading && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  <table
                    data-cy="peopleTable"
                    className="
                      table is-striped
                      is-hoverable
                      is-narrow is-fullwidth
                    "
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
                      {people.map(person => (
                        <tr
                          className={classNames({
                            'has-background-warning': person.slug === slug,
                          })}
                          key={person.slug}
                          data-cy="person"
                        >
                          <PersonInfo personInfo={person} people={people} />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
