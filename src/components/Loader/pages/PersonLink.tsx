import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';

type Props = {
  person: Person;
  setSelectedSlug: React.Dispatch<React.SetStateAction<string>>;
};

export const PersonLink: React.FC<Props> = ({
  person,
  setSelectedSlug,
}) => {
  const handleClick = (slug: string): void => {
    setSelectedSlug(slug);
  };

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      onClick={() => handleClick(person.slug)}
    >
      {person.name}
    </Link>
  );
};
