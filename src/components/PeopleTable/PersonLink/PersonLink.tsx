import { Link } from 'react-router-dom';
import { Person } from '../../../types/Person';

type PersonLinkProps = {
  person: Person,
  handleSelectedPerson: (slug: string) => void,
};

export const PersonLink: React.FC<PersonLinkProps> = (
  { person, handleSelectedPerson },
) => {
  return (
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
        onClick={() => handleSelectedPerson(person.slug)}
      >
        {person.name}
      </Link>
    </td>
  );
};
