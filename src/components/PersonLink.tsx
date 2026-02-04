import { Person } from '../types/Person';

type Props = {
  person?: Person | null;
  className?: string;
};

export const PersonLink = ({ person, className }: Props) => {
  if (!person) {
    return null;
  }

  const extra = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <a
      href={`#/people/${person.slug}`}
      className={[extra, className].filter(Boolean).join(' ')}
    >
      {person.name}
    </a>
  );
};

export default PersonLink;
