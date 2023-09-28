import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const MALE_SEX = 'm';
const isMale = (sex: string) => {
  return sex === MALE_SEX;
};

type Props = {
  name: string,
  slug: string,
  sex: string,
};

export const TableLink: React.FC<Props> = ({ name, slug, sex }) => (
  <td>
    <Link
      className={classNames({
        'has-text-danger': !isMale(sex),
      })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  </td>
);
