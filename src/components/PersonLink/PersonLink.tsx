import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person,
  handleSelectedPerson: (human: string) => void;
};

export const PersonLink: React.FC<Props> = ({
  person,
  handleSelectedPerson,
}) => {
  return (
    <Link
      className={cn({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
      onClick={() => handleSelectedPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};
