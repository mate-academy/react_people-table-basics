type Params = {
  isActive: boolean;
};

export const getLinkClass = ({ isActive }: Params) =>
  'navbar-item' + (isActive ? ' has-background-grey-lighter' : '');
