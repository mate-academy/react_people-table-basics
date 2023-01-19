import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink:React.FC<Props> = ({ person }) => {
  const personSlug = useParams();
  const isSelected = (slug: string) => {
    return personSlug.slug === slug;
  };

  return (
    <Link
      to={isSelected(person.slug)
        ? '../people'
        : `../people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
