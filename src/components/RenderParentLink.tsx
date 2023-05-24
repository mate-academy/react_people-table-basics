import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

export type Props = {
  parentName: string | null;
  peopleState: Person[];
};

export const RenderParentLink: React.FC<Props> = ({
  parentName, peopleState,
}) => {
  let parent: Person | null = null;

  if (parentName) {
    parent = peopleState.find(p => p.name === parentName) || null;
  }

  return (
    <td>
      {parent ? (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parent.name}
        </Link>
      ) : (
        '-'
      )}
    </td>
  );
};
