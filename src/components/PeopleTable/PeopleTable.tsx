import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  selectedPersonSlug: string,
};

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  selectedPersonSlug,
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
            slug, sex, born, died, motherName, fatherName,
          } = person;

          const isSelectedPerson = selectedPersonSlug === slug;
          const mother = people.find(mum => mum.name === motherName);
          const father = people.find(dad => dad.name === fatherName);
          const existingMother = motherName || '-';
          const existingFather = fatherName || '-';

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelectedPerson,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {!mother ? existingMother : <PersonLink person={mother} />}
              </td>
              <td>
                {!father ? existingFather : <PersonLink person={father} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
