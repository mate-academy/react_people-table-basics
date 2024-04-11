import { Link } from 'react-router-dom';

import { Person } from '../../types/Person';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;
  const MALE = 'm';
  const isMale = sex === MALE;

  return (
    <Link to={`/people/${slug}`} className={cn({ 'has-text-danger': !isMale })}>
      {name}
    </Link>
  );
};
