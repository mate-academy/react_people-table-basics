import React from 'react';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { findParent } from '../utils/findParent';
import cn from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTabs: React.FC<Props> = ({ people }) => {
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
        {people.map(p => (
          <tr
            data-cy="person"
            key={p.slug}
            className={cn({ 'has-background-warning': slug === p.slug })}
          >
            <td>
              <Link
                to={`../${[p.slug]}`}
                className={cn({ 'has-text-danger': p.sex === 'f' })}
              >
                {p.name}
              </Link>
            </td>

            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>{p.motherName ? findParent(p.motherName, people) : '-'}</td>
            <td>{p.fatherName ? findParent(p.fatherName, people) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
