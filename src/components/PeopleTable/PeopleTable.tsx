import React from 'react';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  peopleFromServer: Person[],
  selectedPersonSlug: string,
  setSelectedPersonSlug: (slug: string) => void,
};

export const PeopleTable: React.FC<Props> = ({
  peopleFromServer,
  selectedPersonSlug,
  setSelectedPersonSlug,
}) => (
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
    {(peopleFromServer.map(person => (
      <tbody key={person.slug}>
        <tr
          data-cy="person"
          className={cn(
            { 'has-background-warning': selectedPersonSlug === person.slug },
          )}
        >
          <td>
            <a
              className={cn(
                { 'has-text-danger': person.sex === 'f' },
              )}
              href={`#/people/${person.slug}`}
              onClick={() => setSelectedPersonSlug(person.slug)}
            >
              {person.name}
            </a>
          </td>

          <td>{person.sex}</td>
          <td>{person.born}</td>
          <td>{person.died}</td>

          <td>
            <a
              className={cn(
                { 'has-text-danger': person.mother },
                { 'has-text-black': !person.mother },
              )}
              href={`#/people/${person.mother?.slug}`}
              onClick={() => setSelectedPersonSlug(person.mother?.slug || '')}
            >
              {person.motherName || '-'}
            </a>
          </td>

          <td>
            <a
              className={cn(
                { 'has-text-black': !person.father },
              )}
              href={`#/people/${person.father?.slug}`}
              onClick={() => setSelectedPersonSlug(person.father?.slug || '')}
            >
              {person.fatherName || '-'}
            </a>
          </td>
        </tr>
      </tbody>
    )))}
  </table>
);
