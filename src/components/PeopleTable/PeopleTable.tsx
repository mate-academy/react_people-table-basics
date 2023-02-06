import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  selectedPersonSlug: string,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
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

    <tbody>
      {people.map(person => {
        const {
          slug, sex, motherName, fatherName, born, died,
        } = person;

        const isSelected = slug === selectedPersonSlug;
        const mother = people.find(mom => mom.name === motherName);
        const father = people.find(dad => dad.name === fatherName);
        const formattedMotherName = !motherName ? '-' : motherName;
        const formattedFatherName = !fatherName ? '-' : fatherName;

        return (
          <tr
            key={slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': isSelected,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {!mother ? formattedMotherName : <PersonLink person={mother} />}
            </td>
            <td>
              {!father ? formattedFatherName : <PersonLink person={father} />}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
