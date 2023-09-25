import { Link } from 'react-router-dom';
import classNames from 'classnames';
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
      className={classNames({
        'has-text-danger': person.sex === GENDER_FEMALE,
      })}
    >
      {person.name}
    </Link>
  );
};
