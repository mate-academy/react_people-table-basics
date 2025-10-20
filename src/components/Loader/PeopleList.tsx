import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedPersonSlug?: string | null;
  onSelect?: (slug: string) => void;
};

export const PeopleList: React.FC<Props> = ({
  people,
  selectedPersonSlug = null,
  onSelect,
}) => {
  const { personSlug } = useParams<{ personSlug: string }>();
  const currentSelectedSlug = personSlug ?? selectedPersonSlug;

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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === currentSelectedSlug,
            })}
            onClick={() => onSelect?.(person.slug)}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName || null} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName || null} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
