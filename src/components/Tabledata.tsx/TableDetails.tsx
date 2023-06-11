import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  addClassToRow: (event: string) => void;
  clickedSlug: string;
}

export const TableDetails: React.FC<Props> = ({
  person,
  addClassToRow,
  clickedSlug,
}) => {
  const {
    born, died, sex, name, fatherName, motherName, slug,
  } = person;

  const handleClick = (event: string) => {
    addClassToRow(event);
  };

  return (
    <tr
      data-cy="person"
      className={clickedSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          onClick={() => handleClick(slug)}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {sex === 'f' ? (
          <Link to={`/people/${slug}`} className="has-text-danger">
            {motherName || '-'}
          </Link>
        ) : (
          <span>{motherName || '-'}</span>
        )}
      </td>
      <td>
        {sex === 'm' ? (
          <Link to={`/people/${slug}`} className="has-color-grey-lighter">
            {fatherName || '-'}
          </Link>
        ) : (
          <span>{fatherName || '-'}</span>
        )}
      </td>
    </tr>
  );
};
