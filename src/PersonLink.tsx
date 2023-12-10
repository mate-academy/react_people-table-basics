import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from './types';

type Props = {
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ people }) => {
  const { persSlug } = useParams();

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
        {people.map(({
          born,
          died,
          fatherName,
          motherName,
          name,
          sex,
          slug,
          mother = people.find(el => el.name === motherName),
          father = people.find(el => el.name === fatherName),
        }) => (
          <tr
            data-cy="person"
            key={slug}
            className={classNames({
              'has-background-warning': persSlug === slug,
            })}
          >
            <td>
              <Link
                to={`../${slug}`}
                className={classNames({ 'has-text-danger': sex === 'f' })}
              >
                {name}
              </Link>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? (
                <Link to={`../${mother.slug}`} className="has-text-danger">
                  {mother.name}
                </Link>
              ) : (
                motherName || '-'
              )}
            </td>
            <td>
              {father ? (
                <Link to={`../${father.slug}`}>
                  {father.name}
                </Link>
              ) : (
                fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
