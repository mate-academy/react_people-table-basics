type NavLinkClassArgs = {
  isActive: boolean;
};

export const getNavLinkClass = ({ isActive }: NavLinkClassArgs) =>
  isActive ? 'navbar-item has-background-grey-lighter' : 'navbar-item';
