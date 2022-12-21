import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person,
  slugCheck: string | undefined,
  findParent: (ParentName: string | null) => string | JSX.Element,
}

export const PersonInfo: React.FC<Props> = (props) => {
  const { person, slugCheck, findParent } = props;

  const {
    name, sex, born, died, fatherName, motherName, slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugCheck,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParent(motherName)}</td>
      <td>{findParent(fatherName)}</td>
    </tr>
  );
};
