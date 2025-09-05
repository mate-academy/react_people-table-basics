import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parent: Person | undefined;
  parentName: string | null;
};

export function ParentLink({ parent, parentName }: Props) {
  if (!parentName) {
    return <td>-</td>;
  }

  return (
    <td>
      {parent ? (
        <Link
          to={parent.slug}
          className={`${parent.sex === 'f' ? 'has-text-danger' : 'has-text-info'}`}
        >
          {parentName}
        </Link>
      ) : (
        parentName
      )}
    </td>
  );
}
