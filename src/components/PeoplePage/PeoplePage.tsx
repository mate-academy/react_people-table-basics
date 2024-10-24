import '../../App.scss';
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonBody } from '../PersonBody/PersonBody';
import { useParams } from 'react-router-dom';
import { getPreparedPeople } from '../../Utils/GetPreparedPeople';

interface Props {}

export const PeoplePage: React.FC<Props> = ({}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadFail, setLoadFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chosenId } = useParams();

  const isCompletedLoadingWithoutFails =
    !isLoading && !people.length && !loadFail;

  const isSuccessfullyLoadedListWithPeople = !isLoading && !!people.length;

  useEffect(() => {
    setIsLoading(true);
    setLoadFail(false);
    getPeople()
      .then(res => {
        setPeople(getPreparedPeople(res));
      })
      .catch(() => setLoadFail(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isLoading && <Loader />}

        {loadFail && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isCompletedLoadingWithoutFails && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {isSuccessfullyLoadedListWithPeople && (
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
                return (
                  <PersonBody
                    chosenId={chosenId}
                    person={person}
                    key={person.slug}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
