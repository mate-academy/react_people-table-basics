import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person?: Person;
  people: Person[];
  name?: string;
};

export const PersonLink: React.FC<Props> = ({ person, people, name }) => {
  const personData = person || people.find(p => p.name === name);

  if (personData) {
    return (
      <Link
        to={`/people/${personData.slug}`}
        className={personData.sex === 'f' ? 'has-text-danger' : ''}
      >
        {personData.name}
      </Link>
    );
  }

  return name;
};
