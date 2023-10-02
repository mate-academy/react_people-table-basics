import { Person } from '../../types';
import { columnNames } from '../../utills/constants';
import { PersonItem } from '../PersonItem/PersonItem';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {columnNames.map(name => (
                <th key={name}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {people.map(person => (
              <PersonItem person={person} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
