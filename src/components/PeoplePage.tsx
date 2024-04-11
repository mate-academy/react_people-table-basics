import { Person } from '../types/Person';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];
const NO_MOTHER = '-';
const NO_FATHER = '-';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const preparePeopleData = (persons: Person[]) => {
    return people.map(person => ({
      ...person,
      mother: persons.find(({ name }) => name === person.motherName),
      father: persons.find(({ name }) => name === person.fatherName),
    }));
  };

  const preparedPeople = preparePeopleData(people);

  const { personSlug } = useParams<{ personSlug: string }>();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {people.length > 0 && (
        <>
          <h1 className="title">People Page</h1>

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {tableHeaders.map(header => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {preparedPeople.map(person => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
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
                    {person.mother && <PersonLink person={person.mother} />}
                    {!person.mother && person.motherName && person.motherName}
                    {!person.mother && !person.motherName && NO_MOTHER}
                  </td>
                  <td>
                    {person.father && <PersonLink person={person.father} />}
                    {!person.father && person.fatherName && person.fatherName}
                    {!person.father && !person.fatherName && NO_FATHER}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};

export default PeoplePage;
