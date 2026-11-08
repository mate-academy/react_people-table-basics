import cn from 'classnames';
import { Link, useMatch } from 'react-router-dom';

import { Person } from '../../types';

type Props = {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PersonRow: React.FC<Props> = ({ person, mother, father }) => {
  const match = useMatch(`/people/${person.slug}`);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': match,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
