import classNames from 'classnames';
import { Link } from 'react-router-dom';

type PropsLink = {
  to: string,
  sex: string,
  name: string,
};

export const PersonLink: React.FC<PropsLink> = ({ to, sex, name }) => {
  return (
    <Link
      to={`/people/${to}`}
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
    >
      {name}
    </Link>
  );
};
