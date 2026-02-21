import React from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
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
        {people.map(p => {
          const mother = people.find(x => x.name === p.motherName);
          const father = people.find(x => x.name === p.fatherName);

          return (
            <tr
              data-cy="person"
              key={p.slug}
              className={classNames({
                'has-background-warning': p.slug === slug,
              })}
            >
              <td>
                <PersonLink person={p} />
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : p.motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : p.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
