import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { PeopleLink } from '../../types/PeopleLink';

export const PersonLink: React.FC<PeopleLink> = ({
  name, slugCurrent, sex,
}) => {
  return (
    <Link
      to={`../${slugCurrent}`}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
};
