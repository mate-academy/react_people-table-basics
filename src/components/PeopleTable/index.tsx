import { Person } from '../../types';
import { PeopleTableRow } from '../PeopleTableRow';

const tableHeadings = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParent = (nameParent: string | null) => {
    return people.find(person => nameParent === person.name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeadings.map(title => {
            return <th key={title}>{title}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const father = findParent(person.fatherName);
          const mother = findParent(person.motherName);

          return (
            <PeopleTableRow
              person={person}
              father={father}
              mother={mother}
              key={person.name}
            />
          );
        })}
      </tbody>
    </table>
  );
};
