import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type PersonTableRowProps = {
  person: Person,
  isSelected: boolean,
  motherSlug?: string,
  fatherSlug?: string,
};

const getClassBySex = (person: Person) => {
  return cn({
    'has-text-danger': person.sex === 'f',
    'has-text-link': person.sex === 'm',
  });
};

const PersonTableRow: React.FC<PersonTableRowProps> = (
  {
    person,
    isSelected,
    motherSlug,
    fatherSlug,
  },
) => {
  return (
    <tr
      className={cn({
        'has-background-warning': isSelected,
      })}
      data-cy="person"
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={getClassBySex(person)}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          motherSlug
            ? (
              <Link
                to={`/people/${motherSlug}`}
                className="has-text-danger"
              >
                {person.motherName}
              </Link>
            )
            : (<p>{person.motherName ? person.motherName : '-'}</p>)
        }
      </td>
      <td>
        {
          fatherSlug
            ? (
              <Link
                to={`/people/${fatherSlug}`}
                className="has-text-link"
              >
                {person.fatherName}
              </Link>
            )
            : (<p>{person.fatherName ? person.fatherName : '-'}</p>)
        }
      </td>
    </tr>
  );
};

export default PersonTableRow;
