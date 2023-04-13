import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface UserLinkProps {
  title: string;
  path: string;
  sex: string;
}

const FEMALE = 'f';

export const UserLink: FC<UserLinkProps> = ({
  title,
  path,
  sex,
}) => {
  return (
    <Link
      to={`../${path}`}
      className={cn({
        'has-text-danger': sex === FEMALE,
      })}
    >
      {title}
    </Link>
  );
};
