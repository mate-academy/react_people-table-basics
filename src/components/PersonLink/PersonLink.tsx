import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink: React.FC<PersonLinkProps> = (
  { person },
) => {
  return (
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    </td>
  );
};
