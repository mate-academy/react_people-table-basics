import { Person } from '../../types/Person';
import { PeopleItem } from '../PeopleItem';

type Props = {
  persons: Person[];
};

export const PeopleList = ({ persons }: Props) => {
  return (
    <tbody>
      {persons.map(person => (
        <PeopleItem key={person.slug} person={person} />
      ))}
    </tbody>
  );
};
