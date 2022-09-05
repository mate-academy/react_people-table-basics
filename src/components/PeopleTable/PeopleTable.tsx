import React, { FC } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = React.memo((props) => {
  const { people } = props;

  const { slug: currentSlug = '/' } = useParams();

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

      {people.map(person => {
        const {
          name,
          sex,
          born,
          died,
          fatherName,
          motherName,
          slug,
          mother,
          father,
        }
   = person;

        return (
          <tbody>
            <tr
              data-cy="person"
              className={classNames('', {
                'has-background-warning': slug === currentSlug,
              })}
              key={slug}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames('', {
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother?.name
                  ? (
                    <Link
                      to={`/people/${mother.slug}`}
                      className="has-text-danger"
                    >
                      {motherName}
                    </Link>
                  )
                  : motherName ?? '-'}
              </td>
              <td>
                {father?.name
                  ? <Link to={`/people/${father.slug}`}>{fatherName}</Link>
                  : fatherName ?? '-'}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
});
