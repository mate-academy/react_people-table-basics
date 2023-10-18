import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const getLinkClass = (sex: string) => {
    return classNames('', {
      'has-text-danger': sex === 'f',
    });
  };

  return (
    <NavLink
      to={`../${person?.slug}`}
      className={getLinkClass(person.sex)}
    >
      {person?.name}
    </NavLink>
  );
};
