import { PersonInfo } from '../PersonInfo/PersonInfo';

import { Person } from '../../types/Person';
import { getParent } from '../../helpers';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  return (
    <tbody>
      {people.map((person) => {
        const {
          slug,
          motherName,
          fatherName,
        } = person;
        const mother = getParent(people, motherName);
        const father = getParent(people, fatherName);

        const personWithParents = {
          ...person,
          mother,
          father,
        };

        return (
          <PersonInfo
            person={personWithParents}
            key={slug}
          />
        );
      })}
    </tbody>
  );
};
