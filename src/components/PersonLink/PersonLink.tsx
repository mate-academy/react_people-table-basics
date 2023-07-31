import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person | null,
};

export const PersonLink:React.FC<Props> = ({ person }) => {
  const isName = person?.name || '-';

  return (
    <Link
      to={`../${person?.slug}`}
      className={classNames({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {isName}
    </Link>
  );
};
