import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
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
        {people.map(person => (
          <tr key={person.slug} className="person">
            <th>{person.name}</th>
            <th>{person.sex}</th>
            <th>{person.born}</th>
            <th>{person.died}</th>
            <th>{person.motherName}</th>
            <th>{person.fatherName}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
