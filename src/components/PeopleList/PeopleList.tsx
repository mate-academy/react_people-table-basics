import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[]
};

export const PeopleList = ({ people }: Props) => {
  return (
    <tbody>
      {people.map(person => {
        const { slug, motherName, fatherName } = person;

        const personMother = people
          .find(({ name }) => name === motherName);

        const personFather = people
          .find(({ name }) => name === fatherName);

        return (
          <PersonItem
            key={slug}
            person={person}
            personMother={personMother}
            personFather={personFather}
          />
        );
      })}
    </tbody>
  );
};
