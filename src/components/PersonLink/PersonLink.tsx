import { Link } from 'react-router-dom';
import { Person, Sex } from '../../types';
import classNames from 'classnames';
import { AppPath } from '../../types/paths';

const FEMALE_CLASS_NAME = 'has-text-danger';

const getPersonClassName = (gender: Sex) => {
  return classNames({ [FEMALE_CLASS_NAME]: gender === Sex.Female });
};

interface Props {
  person: Person;
}

const PersonLink = ({ person: { name, sex, slug } }: Props) => {
  return (
    <Link to={`${AppPath.People}/${slug}`} className={getPersonClassName(sex)}>
      {name}
    </Link>
  );
};

export default PersonLink;
