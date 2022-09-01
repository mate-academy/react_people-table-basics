import classNames from 'classnames';
import { useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPersonSlug, setSelectedPersonSlug] = useState('');

  const getParent = (parentName: string | null) => {
    return parentName
      ? people.find((person) => person.name === parentName)
      : undefined;
  };

  const preparedPersonList = people.map((person) => ({
    ...person,
    mother: getParent(person.motherName),
    father: getParent(person.fatherName),
  }));

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
        {preparedPersonList.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedPersonSlug,
            })}
          >
            <td>
              <PersonLink
                person={person}
                selectPerson={setSelectedPersonSlug}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother ? (
              <td>
                <PersonLink
                  person={person.mother}
                  selectPerson={setSelectedPersonSlug}
                />
              </td>
            ) : (
              <td>{person.motherName ? person.motherName : '-'}</td>
            )}

            {person.father ? (
              <td>
                <PersonLink
                  person={person.father}
                  selectPerson={setSelectedPersonSlug}
                />
              </td>
            ) : (
              <td>{person.fatherName ? person.fatherName : '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
