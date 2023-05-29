import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={classNames(
          person.sex === 'f' ? 'has-text-danger' : '',
        )}
      >
        {person.name}
      </Link>
    </td>
  );
};
