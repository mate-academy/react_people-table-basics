/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from './../../types/Person';
import { PersonLink } from '../person-select/person.select';
import { useParams } from 'react-router-dom';

export default function PeoplePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { slug: targetPersonSlug } = useParams<{ slug: string }>();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const shouldApplyBackground = (slug: string) =>
    targetPersonSlug === slug ? 'has-background-warning' : '';

  const peopleMap = people.reduce(
    (acc, person) => {
      acc[person.name] = person;

      return acc;
    },
    {} as Record<string, Person>,
  );

  const personFields = (person: Person) => [
    {
      key: 'name',
      value: <PersonLink person={person}>{person.name}</PersonLink>,
    },
    { key: 'sex', value: person.sex },
    { key: 'born', value: person.born },
    { key: 'died', value: person.died },
    {
      key: 'mother',
      value: (
        <PersonLink person={peopleMap[person.motherName]}>
          {person.motherName ? person.motherName : '-'}
        </PersonLink>
      ),
    },
    {
      key: 'father',
      value: (
        <PersonLink person={peopleMap[person.fatherName]}>
          {person.fatherName ? person.fatherName : '-'}
        </PersonLink>
      ),
    },
  ];

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
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
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={shouldApplyBackground(person.slug)}
                  >
                    {personFields(person).map(field => (
                      <td
                        key={field.key}
                        className={shouldApplyBackground(person.slug)}
                      >
                        {field.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
