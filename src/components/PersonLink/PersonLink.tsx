import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  existingPeopleSlugs?: Set<string>;
}

export const PersonLink: React.FC<Props> = ({
  person,
  existingPeopleSlugs,
}) => {
  const { name, slug, sex } = person;
  const isWoman = sex === 'f';
  const isValidPerson = existingPeopleSlugs?.has(slug);

  return isValidPerson ? (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {name}
    </Link>
  ) : (
    <span className={classNames({ 'has-text-danger': isWoman })}>{name}</span>
  );
};
