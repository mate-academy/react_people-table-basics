import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  highlightedPersonSlug: string | null;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  highlightedPersonSlug,
}) => {
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
        {people.length === 0 && (
          <tr>
            <td data-cy="noPeopleMessage" colSpan={6}>
              There are no people on the server
            </td>
          </tr>
        )}
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': highlightedPersonSlug === person.slug,
              })}
              key={person?.slug}
            >
              <PersonLink personData={person} people={people} />

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <PersonLink
                personData={person.motherName ? person.motherName : '-'}
                people={people}
              />
              <PersonLink
                personData={person.fatherName ? person.fatherName : '-'}
                people={people}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
