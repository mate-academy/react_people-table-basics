import { PersonRow } from '../PersonRow/index';
import 'bulma';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const tableHeader = Object.keys(people[0]);

  return (
    <table
      className="table is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          {tableHeader.map(title => (
            title !== 'motherName' && title !== 'fatherName' && title !== 'slug' && (
              <th key={title}>
                {title.toUpperCase()}
              </th>
            )
          ))}
        </tr>
      </thead>
      <tbody>
        {people.length > 0 && (
          people.map(person => (
            <PersonRow
              person={person}
              key={person.slug}
            />
          ))
        )}
      </tbody>
    </table>
  );
};
