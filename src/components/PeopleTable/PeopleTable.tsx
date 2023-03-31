import classNames from 'classnames';
import React from 'react';
import { PersonType } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: PersonType[];
  personId: string;
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  personId,
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;
          const mother = people.find(human => human.name === motherName);
          const father = people.find(human => human.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === personId,
              })}
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
                  )
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? (
                    <PersonLink person={father} />
                  )
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
