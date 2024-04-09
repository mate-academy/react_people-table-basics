import { Person } from '../types/Person';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

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
    setLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : loadingError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : people.length > 0 ? (
        <>
          <h1 className="title">People Page</h1>

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
                    {person.mother ? (
                      <PersonLink person={person.mother} />
                    ) : person.motherName ? (
                      person.motherName
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {person.father ? (
                      <PersonLink person={person.father} />
                    ) : person.fatherName ? (
                      person.fatherName
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </>
  );
};

export default PeoplePage;
