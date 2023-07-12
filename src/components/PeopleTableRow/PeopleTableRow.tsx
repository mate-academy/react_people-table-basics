import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { TableRowLink } from '../TableRowLink';

interface Props {
  person: Person
}

export const PeopleTableRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={person.slug}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <TableRowLink parent={person.mother} />
          ) : (
            person.motherName || '-'
          )}
      </td>
      <td>
        {person.father
          ? (
            <TableRowLink parent={person.father} />
          ) : (
            person.fatherName || '-'
          )}
      </td>
    </tr>
  );
};
