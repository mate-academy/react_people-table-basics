/* eslint-disable no-prototype-builtins */
import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  personSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
  const isSelected = (person: Person) => person.slug === personSlug;
  const headTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headTitles.map(title => (
            <th>{ title }</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn(
              { 'has-background-warning': isSelected(person) },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born }</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
