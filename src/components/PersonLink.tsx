import { Link } from 'react-router-dom';

interface PersonLinkProps {
  name: string | null;
  people: Person[];
}

const PersonLink: React.FC<PersonLinkProps> = ({ name, people }) => {
  if (!name) {
    return <span>-</span>;
  }

  const person = people.find(p => p.name === name);

  if (!person) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
