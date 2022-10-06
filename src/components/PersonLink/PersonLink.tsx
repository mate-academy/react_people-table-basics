import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | null;
  parent?: string
};

export const PersonLink: FC<Props> = ({ person, parent }) => {
  return (
    <>
      {
        person
          ? (
            <Link
              to={`../${person.slug}`}
              className={classNames(
                { 'has-text-danger': person.sex === 'f' },
              )}
            >
              {person.name}
            </Link>
          )
          : (
            <>
              {parent}
            </>
          )
      }
    </>
  );
};
