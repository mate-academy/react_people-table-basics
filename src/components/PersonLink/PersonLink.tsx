import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type PropTypes = {
  person: Person
};

export const PersonLink: React.FC<PropTypes> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <td>
      <NavLink
        to={`../${slug}`}
        className={classNames({
          'has-text-danger': sex === 'f',
        })}
      >
        {name}
      </NavLink>
    </td>
  );
};
