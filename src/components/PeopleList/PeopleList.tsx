import { Person } from '../../types/Person';
import { PeopleItem } from '../PeopleItem';

type Props = {
  persons: Person[];
  selectedSlug?: string;
};

export const PeopleList = ({ persons, selectedSlug }: Props) => {
  return (
    <tbody>
      {persons.map(person => (
        <PeopleItem
          key={person.slug}
          person={person}
          isSelected={person.slug === selectedSlug}
        />
      ))}
    </tbody>
  );
};
