import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonItem: FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  const personClass = sex === 'f' ? 'has-text-danger' : undefined;

  return (
    <>
      <td>
        <Link to={`/people/${slug}`} className={personClass}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          mother
            ? (
              <Link to={`/people/${motherName}`} className="has-text-danger">
                {motherName}
              </Link>
            )
            : motherName || '-'
        }
      </td>
      <td>
        {
          father
            ? <Link to={`/people/${fatherName}`}>{fatherName}</Link>
            : fatherName || '-'
        }
      </td>
    </>
  );
};
