import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  name: string;
  to: string;
  sex: string;
};

const SEX = 'f';

export const CustomLink: React.FC<Props> = ({ name, to, sex }) => {
  const isDanger = sex === SEX;

  return (
    <Link
      to={to}
      className={cn({
        'has-text-danger': isDanger,
      })}
    >
      {name}
    </Link>
  );
};
