import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
  } = person;

  const isWoman = sex === 'f';

  return (
    <Link
      to={`../${slug}`}
      className={classNames({
        'has-text-danger': isWoman,
      })}
    >
      {name}
    </Link>
  );
};
