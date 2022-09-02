import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { PersonLink } from './PersonLink';
import { Person } from './types';

interface Props {
  people: Person[] | null,
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState('');

  const findParent = useCallback((name: string | null) => {
    if (!name) {
      return null;
    }

    const parent = people?.find(person => person.name === name);

    if (!parent) {
      return null;
    }

    return parent;
  }, [people]);

  const peopleWithParents = useMemo<Person[]>(() => {
    if (!people) {
      return [];
    }

    return people.map(person => ({
      ...person,
      mother: findParent(person.motherName),
      father: findParent(person.fatherName),
    }));
  }, [people]);

  return (
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
        {peopleWithParents.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  setSelectedPerson={setSelectedPerson}
                />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <PersonLink
                    person={person.mother}
                    setSelectedPerson={setSelectedPerson}
                  />
                ) : (person.motherName || '-')}
              </td>
              <td>
                {person.father ? (
                  <PersonLink
                    person={person.father}
                    setSelectedPerson={setSelectedPerson}
                  />
                ) : person.fatherName}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
