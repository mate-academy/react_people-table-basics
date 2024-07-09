import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { peoplePath } from '../consts/paths';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`${peoplePath}/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
