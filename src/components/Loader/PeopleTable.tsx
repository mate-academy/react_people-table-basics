/* eslint-disable no-prototype-builtins */
import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

const headTitles = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const { personSlug = '' } = useParams();
  const isSelectedPerson = (person: Person) => person.slug === personSlug;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headTitles.map(title => (
            <th>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn(
              { 'has-background-warning': isSelectedPerson(person) },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
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
});
