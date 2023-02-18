import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | null,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <td>
      <NavLink
        to={`#/people/${person?.name}-${person?.born}`.replace(/ /g, '-')}
        className={classNames({
          'has-text-danger': person?.sex === 'f',
        })}
      >
        {person?.name}
      </NavLink>
    </td>
  );
};
