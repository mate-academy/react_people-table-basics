import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  text: string | null
  redColorCondition: boolean
  to: string
};

export const PersonLink: React.FC<Props> = ({
  text,
  redColorCondition,
  to,
}) => {
  return (
    <td>
      <Link
        className={cn('', { 'has-text-danger': redColorCondition })}
        to={to}
      >
        {text || '-'}
      </Link>
    </td>
  );
};
