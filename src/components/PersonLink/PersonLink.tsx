import { Link } from 'react-router-dom';
import { GENDER_FEMALE } from '../../utils/consts';
import { PersonType } from '../../types';

type Props = {
  person: PersonType,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`${person.slug}`}
      replace
      className={person.sex === GENDER_FEMALE ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
