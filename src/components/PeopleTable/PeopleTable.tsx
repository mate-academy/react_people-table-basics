import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type PropTypes = {
  people: Person[];
  personSlug: string;
};

export const PeopleTable: React.FC<PropTypes> = ({ people, personSlug }) => {
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
            slug,
          } = person;

          const motherChecked = motherName || '-';
          const fatherChecked = fatherName || '-';
          const mother = people.find(human => human.name === motherName);
          const father = people.find(human => human.name === fatherName);
          const isSelectedLink = slug === personSlug;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelectedLink,
              })}
            >
              <PersonLink person={person} />

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {!mother ? motherChecked : <PersonLink person={mother} />}
              </td>
              <td>
                {!father ? fatherChecked : <PersonLink person={father} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
