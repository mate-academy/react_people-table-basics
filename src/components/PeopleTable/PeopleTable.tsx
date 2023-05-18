import React from 'react';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <div className="block">
    <div className="box table-container">
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
          {people.map(({
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          }) => (
            <tr
              data-cy="person"
              key={slug}
            >
              <td>
                <a href={`/people/${slug}`}>
                  {name}
                </a>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName || '-'}</td>
              <td>{fatherName || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
