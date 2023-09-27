import { Link } from 'react-router-dom';
import { Person } from '../../types';

type ParentsPageProps = {
  parentPerson?: Person | null;
  parentName?: string | null;
};

export const ParentsPage: React.FC<ParentsPageProps> = ({
  parentPerson = null,
  parentName = null,
}) => {
  if (parentPerson) {
    return (
      <Link
        className={parentPerson.sex === 'f' ? 'has-text-danger' : ''}
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
