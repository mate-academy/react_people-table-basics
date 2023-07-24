import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  parent: string | null;
  getPersonByParent: (str: string) => Person | undefined;
}

export const PersonLink: React.FC<Props> = ({ parent, getPersonByParent }) => {
  if (!parent) {
    return <td>-</td>;
  }

  const personIsParent = getPersonByParent(parent);

  return (
    <td>
      {personIsParent ? (
        <Link
          to={`/people/${personIsParent.slug}`}
          className={classNames({
            'has-text-danger': personIsParent.sex === 'f',
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
