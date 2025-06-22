import { Person } from '../../types/Person';
import cn from 'classnames';

type ParentLinkProps = {
  parentName: string | null;
  people: Person[];
};

export const ParentLink: React.FC<ParentLinkProps> = ({
  parentName,
  people,
}) => {
  const parent = people.find(person => person.name === parentName);

  if (!parentName || !parent) {
    return <>{parentName}</>;
  }

  return (
    <a
      href={`#/people/${parent.slug}`}
      className={cn({ 'has-text-danger': parent.sex === 'f' })}
    >
      {parent.name}
    </a>
  );
};
