import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';

interface ListOfPeopleProps {
  slugFromParam: Person['slug'] | undefined;
  visiblePeople: Person[] | undefined;
}

export const ListOfPeople: React.FC<ListOfPeopleProps> = ({
  slugFromParam,
  visiblePeople,
}) => {
  return (
    <>
      {visiblePeople?.map(person => {
        return (
          <PersonItem
            key={person.slug}
            person={person}
            slugFromParam={slugFromParam}
          />
        );
      })}
    </>
  );
};
