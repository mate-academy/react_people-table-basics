import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  name: string;
  sex: string;
};

export const PersonLink: FC<Props> = ({ to, name, sex }) => (
  <Link
    to={to}
    className={classNames('', {
      'has-text-danger': sex === 'f',
      'has-text-info': sex === 'm',
    })}
  >
    {name}
  </Link>
);
