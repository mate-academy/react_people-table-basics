import cn from 'classnames';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div className={cn('Loader')} data-cy="loader">
    <div className={cn('Loader__content')} />
  </div>
);
