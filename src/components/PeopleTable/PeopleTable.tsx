import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: People[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleWithParents = people.map(child => {
    child.mother = people.find(parent => parent.name === child.motherName)
     || null;

    child.father = people.find(parent => parent.name === child.fatherName)
     || null;

    return child;
  });

  return (
    <table className="PeopleTable table">
      <thead>
        <th>name</th>
        <th>sex</th>
        <th>born</th>
        <th>died</th>
        <th>mother</th>
        <th>father</th>
      </thead>

      <tbody>
        <PersonRow people={peopleWithParents} />
      </tbody>
    </table>
  );
};
