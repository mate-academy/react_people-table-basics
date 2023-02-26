import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  name:string,
  slug:string,
  sex: string,
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  const isWoman = sex === 'f';

  return (
    <td>
      <Link
        to={`/people/${slug}`}
        className={classNames({ 'has-text-danger': isWoman })}
      >
        {name}
      </Link>
    </td>
  );
};
