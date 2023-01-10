import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parent: string | null,
  getParent: (value: string | null) => Person | undefined,
};

export const ParentLink: React.FC<Props> = ({ parent, getParent }) => {
  const personIsParent = getParent(parent);

  if (!parent) {
    return (
      <td> - </td>
    );
  }

  return (
    <td>
      {personIsParent ? (
        <Link
          to={`/people/${personIsParent?.slug}`}
          className={classNames({
            'has-text-danger': personIsParent?.sex === 'f',
          })}
        >
          {parent}
        </Link>
      ) : (
        parent
      )}
    </td>
  );
};
