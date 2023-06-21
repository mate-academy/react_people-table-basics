import React, { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: FC<Props> = React.memo(({ people, selectedSlug }) => {
  const isSelected = (person: Person) => person.slug === selectedSlug;

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
        {people.map((person) => {
          const mother = people
            .find((parent) => parent.name === person.motherName);
          const father = people
            .find((parent) => parent.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} selectedSlug={person.slug} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? (<PersonLink person={mother} selectedSlug={mother.slug} />)
                  : (person.motherName || '-')}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} selectedSlug={father.slug} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
