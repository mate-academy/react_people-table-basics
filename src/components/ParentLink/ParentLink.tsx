import { Link } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { ROUTES } from '../../Variables';
import { Person } from '../../types';

interface ParentProps {
  people: Person[];
  name: string;
  sex: 'f' | 'm';
}

export const ParentLink: FC<ParentProps> = ({ people, name, sex }) => {
  const parent = people.find(person => person.name === name);
  const isPresent = !!parent;

  return (
    <td>
      {isPresent ? (
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={`${ROUTES.people}/${parent.slug}`}
        >
          {parent.name}
        </Link>
      ) : (name)}
    </td>
  );
};
