import { useContext } from 'react';
import { PeopleContext } from '../../store/PeopleContext';
import { PersonInfo } from '../PersonInfo';

const tableDescription = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableDescription.map(option => (
            <th key={option}>{option}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
