import React from 'react';
import { Person } from '../model/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const findByName = (name: string | null): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(person => person.name === name);
  };

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
          const mother = findByName(person.motherName);
          const father = findByName(person.fatherName);

          const rowClassName =
            selectedSlug === person.slug ? 'has-background-warning' : '';

          return (
            <tr key={person.slug} data-cy="person" className={rowClassName}>
              {/* Name */}
              <td>
                <PersonLink person={person} />
              </td>

              {/* Sex */}
              <td>{person.sex}</td>

              {/* Born / Died */}
              <td>{person.born}</td>
              <td>{person.died}</td>

              {/* Mother */}
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              {/* Father */}
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
