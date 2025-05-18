import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

import React from 'react';
import { Person } from '../types';

type Props = {
  people: Person[];
};

export const PersonTable: React.FC<Props> = ({ people }) => {
  const { slugs } = useParams();

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
          const { sex, born, died, fatherName, motherName, slug } = person;
          const mother = people.find(p => p.name === motherName);
          const father = people.find(p => p.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slugs === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {!motherName ? (
                <td>-</td>
              ) : (
                <td>{mother ? <PersonLink person={mother} /> : motherName}</td>
              )}
              {!fatherName ? (
                <td>-</td>
              ) : (
                <td>{father ? <PersonLink person={father} /> : fatherName}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
