import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { slug: activePerson } = useParams();

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
        {peoples.map(people => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = people;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': activePerson === slug,
              })}
            >
              <td>
                <PersonLink person={people} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                <PersonLink person={mother ?? motherName} />
              </td>
              <td>
                <PersonLink person={father ?? fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
