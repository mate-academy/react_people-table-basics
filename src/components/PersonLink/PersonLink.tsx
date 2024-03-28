import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
