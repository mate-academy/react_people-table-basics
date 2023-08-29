import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedPerson: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
/*   const findMother = (mothername: string) => people.find(p => p.motherName === mothername) */
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
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            mother,
            father,
          } = person;
          const isSelected = selectedPerson === person.slug;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? (
                    <PersonLink person={mother} />
                  ) : (
                    motherName || '-'
                  )}
              </td>

              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  ) : (
                    fatherName || '-'
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
