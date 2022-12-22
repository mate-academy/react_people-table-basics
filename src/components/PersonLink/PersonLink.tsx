import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  slug: string;
  sex: string;
  name: string;
}
export const PersonLink:FC<Props> = ({ slug, sex, name }) => (
  <NavLink
    to={`/people/${slug}`}
    className={classNames({
      'has-text-danger': sex === 'f',
    })}
  >
    {name}
  </NavLink>
);
