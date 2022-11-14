import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
  className: string,
};

export const PersonLink: FC<Props> = ({ to, text, className }) => {
  return (
    <Link
      to={to}
      className={className}
    >
      {text}
    </Link>
  );
};
