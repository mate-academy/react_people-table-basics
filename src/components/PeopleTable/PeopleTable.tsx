import { useEffect, useState, useMemo } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonItem } from '../PersonItem';
import React from 'react';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isPeopleEmpty = people.length === 0;

  const preparePeopleWithLinks = (peopleList: Person[]) => {
    return peopleList.map(person => {
      const { fatherName, motherName } = person;

      return {
        ...person,
        fatherNameLink:
          peopleList.find(p => p.name === fatherName)?.slug || null,
        motherNameLink:
          peopleList.find(p => p.name === motherName)?.slug || null,
      };
    });
  };

  const preparedPeople = useMemo(
    () => preparePeopleWithLinks(people),
    [people],
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && isPeopleEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isPeopleEmpty && (
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
                {preparedPeople.map(person => (
                  <PersonItem key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
