import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findParent = (nameParent: string | null) => {
    return people.find(person => nameParent === person.name);
  };

  const titlesTable = [
    { id: 1, titleName: 'Name' },
    { id: 2, titleName: 'Sex' },
    { id: 3, titleName: 'Born' },
    { id: 4, titleName: 'Died' },
    { id: 5, titleName: 'Mother' },
    { id: 6, titleName: 'Father' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titlesTable.map(title => (
            <th key={title.id}>{title.titleName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            person={person}
            key={person.slug}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};
