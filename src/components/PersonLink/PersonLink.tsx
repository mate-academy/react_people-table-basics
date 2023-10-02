import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`../${slug}`}
      className={classNames(
        { 'has-text-danger': sex === Sex.Female },
      )}
    >
      {name}
    </Link>
  );
};
