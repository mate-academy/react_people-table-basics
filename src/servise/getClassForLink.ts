import cn from 'classnames';

export const getClassForLink = ({
  isActive,
}: {
  isActive: boolean;
}): string | undefined => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};
