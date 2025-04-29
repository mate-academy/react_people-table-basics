import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
      // onClick={() => setSelected(slug)}
    >
      {name}
    </Link>
  );
};
