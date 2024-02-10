import { Person } from '../types';

interface PersonLinkProps {
  person: Person
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  return (
    <div>
      {person.name}
    </div>
  );
};
