import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

type Props = {
  parent: Person | undefined;
  name: string | null;
};

export const ParentLink: React.FC<Props> = ({ parent, name }) => (
  <td>
    {parent ? (
      <Link
        className={cn({ 'has-text-danger': parent.sex === 'f' })}
        to={`../${parent.slug}`}
      >
        {name}
      </Link>
    ) : (
      name || '-'
    )}
  </td>
);
