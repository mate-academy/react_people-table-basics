import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PersonType } from '../../types';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

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
