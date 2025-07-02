import { Person } from '../api';

interface Props {
  person?: Person;
  name: string;
}

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </a>
  );
};
