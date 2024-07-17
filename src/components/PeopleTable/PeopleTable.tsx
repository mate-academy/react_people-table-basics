import { useContext } from 'react';
import { PeopleContext } from '../../store/PeopleContext';
import { PeopleLink } from '../PeopleLink/PeopleLink';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);

  const peopleList = people.map(person => ({
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
        {peopleList.map(person => (
          <PeopleLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
