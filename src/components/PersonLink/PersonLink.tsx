import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string | null;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ to, name, sex }) => (
  <Link
    to={`/people/${to}`}
    className={classNames({
      'has-text-danger': (sex === 'f'),
    })}
  >
    {name}
  </Link>
);
