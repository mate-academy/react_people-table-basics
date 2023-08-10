import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface PersonLinkProps {
  to: string;
  text: string | null;
  hasTextDanger?: boolean;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  to,
  text,
  hasTextDanger = false,
}) => (
  <Link
    to={to}
    className={cn({
      'has-text-danger': hasTextDanger,
    })}
  >
    {text}
  </Link>
);
