import { Link } from 'react-router-dom';
import cn from 'classnames';

import { PersonType } from '../../types';

const FEMALE = 'f';

interface Props {
  person: PersonType;
}

const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === FEMALE })}
    >
      {name}
    </Link>
  );
};

export default PersonLink;
