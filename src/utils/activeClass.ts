import classNames from 'classnames';

export const activeClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-gray-lighter': isActive,
  });
};
