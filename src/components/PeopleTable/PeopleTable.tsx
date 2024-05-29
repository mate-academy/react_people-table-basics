import { Person } from '../../types';
import { PeopleLink } from '../PeopleLink/PeopleLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const preparedPeople = people?.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PeopleLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
