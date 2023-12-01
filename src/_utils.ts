import cn from 'classnames';

export function getNavLinkClass(isActive: boolean) {
  return cn(
    'navbar-item',
    {
      'has-background-grey-lighter': isActive,
    },
  );
}
