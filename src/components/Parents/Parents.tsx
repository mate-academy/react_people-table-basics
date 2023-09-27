import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type ParentsProps = {
  parentPerson?: Person | null;
  parentName?: string | null;
};

export const Parents: React.FC<ParentsProps> = ({
  parentPerson = null,
  parentName = null,
}) => {
  if (parentPerson) {
    return (
      <Link
        className={classNames({ 'has-text-danger': parentPerson.sex === 'f' })}
        to={parentPerson.slug}
      >
        {parentName}
      </Link>
    );
  }

  return (
    <>
      {parentName || '-'}
    </>
  );
};
