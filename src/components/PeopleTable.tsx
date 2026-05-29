import { Person } from '../types';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  people: Person[];
};

const TABLE_HEADERS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable = ({ people }: PeopleTableProps) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_HEADERS.map(header => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {people.length === 0 ? (
          <tr>
            <td colSpan={TABLE_HEADERS.length}>
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            </td>
          </tr>
        ) : (
          people.map(person => {
            return (
              <PersonLink key={person.slug} person={person} people={people} />
            );
          })
        )}
      </tbody>
    </table>
  );
};
