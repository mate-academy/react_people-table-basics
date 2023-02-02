import { FC, memo } from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const Navbar: FC = memo(() => {
  return (
    <div className="navbar-brand">
      <PageNavLink to="/" text="Home" />
      <PageNavLink to="people" text="People" />
    </div>
  );
});
