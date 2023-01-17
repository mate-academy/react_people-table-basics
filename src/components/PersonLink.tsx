import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  className?: string,
};

export const PersonLink:React.FC<Props> = ({ person, className }) => {
  const personSlug = useParams();
  const isSelected = (slug: string) => {
    return personSlug.slug === slug;
  };

  return (
    <Link
      to={isSelected(person.slug)
        ? '../people'
        : `../people/${person.slug}`}
      className={className}
    >
      {person.name}
    </Link>
  );
};
