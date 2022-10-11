import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  to: string,
  sex: string,
  name: string,
};

export const PersonLink: React.FC<Props> = ({ to, sex, name }) => {
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
