/* eslint-disable no-nested-ternary */
import React from 'react';
import { Person } from '../types';

interface Props {
  people: Person[];
}

export const Table: React.FC<Props> = ({ people }) => {
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
        {people.map((p) => (
          <tr
            data-cy="person"
            key={p.slug}
            className={window.location.hash === `#/people/${p.slug}` ? 'has-background-warning' : ''}
          >
            <td>
              <a href={`#/people/${p.slug}`}>{p.name}</a>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>
              {p.mother ? (
                people.find((person) => person.name === p.mother) ? (
                  <a href={`#/people/${people.find((person) => person.name === p.mother)?.slug}`}>
                    {p.mother}
                  </a>
                ) : (
                  p.mother
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {p.father ? (
                people.find((person) => person.name === p.father) ? (
                  <a href={`#/people/${people.find((person) => person.name === p.father)?.slug}`}>
                    {p.father}
                  </a>
                ) : (
                  p.father
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
