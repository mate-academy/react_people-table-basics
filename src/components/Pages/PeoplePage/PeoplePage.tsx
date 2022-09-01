import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { LinkToPerson } from '../../LinkToPerson';
import { Loader } from '../../Loader';

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople().then((res) => {
      setPeople(res);
    }).catch(() => setError('Failed to load people'));
  });

  const findRelatives = useCallback((name: string | null) => (
    name ? people.find(person => person.name === name) : null
  ), [people]);

  const preparedPeople = useMemo<Person[]>(() => (
    people.map(person => ({
      ...person,
      mother: findRelatives(person.motherName),
      father: findRelatives(person.fatherName),
    }))
  ), [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      {error && <h1 className="has-text-danger">{error}</h1>}
      {people.length === 0 && <Loader />}
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
              data-cy="person"
              className={person.slug === selectedPerson
                ? 'has-background-warning' : ''}
            >
              <td>
                <a
                  href={`#/people/${person.slug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  onClick={() => setSelectedPerson(person.slug)}
                >
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (
                    <LinkToPerson
                      person={person.mother}
                      onSelectedPerson={setSelectedPerson}
                    />
                  )
                  : person.motherName}
              </td>
              <td>
                {person.father
                  ? (
                    <LinkToPerson
                      person={person.father}
                      onSelectedPerson={setSelectedPerson}
                    />
                  )
                  : person.fatherName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
