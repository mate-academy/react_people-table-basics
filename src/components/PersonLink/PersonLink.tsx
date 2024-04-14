import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;
  const nameClass = classNames({
    'has-text-danger': sex === 'f',
  });

  return (
    <Link to={`/people/${slug}`} className={nameClass}>
      {name}
    </Link>
  );
};
