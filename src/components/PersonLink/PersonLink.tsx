import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string;
  name: string;
  sex: string
};

export const PersonLink: React.FC<Props> = ({ to, name, sex }) => {
  return (
    <Link
      to={`../${to}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
