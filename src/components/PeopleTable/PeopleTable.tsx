import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';

const preparePeopleWithLinks = (peopleList: Person[]) => {
  return peopleList.map(person => {
    const { fatherName, motherName } = person;

    return {
      ...person,
      fatherNameLink:
        peopleList.find(candidate => candidate.name === fatherName)?.slug ||
        null,
      motherNameLink:
        peopleList.find(candidate => candidate.name === motherName)?.slug ||
        null,
    };
  });
};

const tableFields = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isPeopleEmpty = !people.length;

  const preparedPeople = useMemo(
    () => preparePeopleWithLinks(people),
    [people],
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
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

          {!isLoading && !isError && isPeopleEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isPeopleEmpty && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {tableFields.map(field => (
                    <th key={field}>{field}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {preparedPeople.map(person => (
                  <PersonLink key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
