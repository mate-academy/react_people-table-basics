import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  parent: Person,
}

export const TableRowLink: FC<Props> = ({ parent }) => {
  return (
    <Link
      className={classNames({ 'has-text-danger': parent.sex === 'f' })}
      to={parent.slug}
    >
      {parent.name || '-'}
    </Link>
  );
};
