import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  human: Person
};

export const HumanLink: FC<Props> = ({ human }) => {
  return (
    <Link
      to={`/people/${human.slug}`}
      className={
        classNames({ 'has-text-danger': human?.sex === 'f' })
      }
    >
      {human.name}
    </Link>
  );
};
