import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams<{ slug: string }>();

  // Map для швидкого пошуку батьків за ім'ям
  const peopleByName = new Map<string, Person>(
    people.map(person => [person.name, person]),
  );

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
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;
          const mother = person.motherName
            ? peopleByName.get(person.motherName)
            : undefined;
          const father = person.fatherName
            ? peopleByName.get(person.fatherName)
            : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
