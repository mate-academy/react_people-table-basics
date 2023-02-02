import { FC } from 'react';
import { CustomNavLink } from '../CustomNavLink';

export const Navigation: FC = () => {
  return (
    <div className="navbar-brand">
      <CustomNavLink
        to="/"
        title="Home"
      />

      <CustomNavLink
        to="/people"
        title="People"
      />
    </div>
  );
};
