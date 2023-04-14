import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person,
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const {
    sex,
    name,
    slug,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
