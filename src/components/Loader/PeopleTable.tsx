// #region imports
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import React from 'react';
// #endregion

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

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
          const { sex, born, died, motherName, fatherName } = person;

          const getParent = (parentName: string | null) => {
            if (!parentName) {
              return '-';
            }

            const parent = people.find(({ name }) => name === parentName);

            return parent ? <PersonLink person={parent} /> : parentName;
          };

          return (
            <tr
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getParent(motherName)}</td>
              <td>{getParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
