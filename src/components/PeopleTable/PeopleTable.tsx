import { FC } from 'react';
import { Person } from '../Person';
import { PersonType } from '../../types';

interface PeopleTableProps {
  people: PersonType[];
}

export const PeopleTable: FC<PeopleTableProps> = ({
  people,
}) => {
  const findParent = (
    data: PersonType[],
    parentName: string | null,
  ): PersonType | null => {
    return data.find(person => person.name === parentName) || null;
  };

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
        {people.map(person => {
          const { slug } = person;
          const mom = findParent(people, person.motherName);
          const dad = findParent(people, person.fatherName);

          return (
            <Person
              key={slug}
              person={person}
              mom={mom}
              dad={dad}
            />
          );
        })}
      </tbody>
    </table>
  );
};
