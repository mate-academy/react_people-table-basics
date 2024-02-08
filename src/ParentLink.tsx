import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ParentInterface } from './types/ParentInterface';

export const ParentLink: React.FC<ParentInterface> = ({ parent }) => {
  return (
    <Link
      to={`../${parent.slug}`}
      className={classNames(
        { 'has-text-danger': parent.sex === 'f' },
      )}
    >
      {parent.name}
    </Link>
  );
};
