import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  text: string;
};

export const HeaderNavLink: React.FC<Props> = (props) => {
  const { to, text } = props;

  return (
    <NavLink
      className={({ isActive }) => classNames('navbar-item',
        { 'has-background-grey-lighter': isActive })}
      to={to}
    >
      {text}
    </NavLink>
  );
};
