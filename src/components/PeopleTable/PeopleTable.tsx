import { FC } from 'react';
import { Person } from '../../types/Person';
import { PersonComponent } from '../PersonComponent';

type Props = {
  peopleData: Person[],
  selectedPerson: string,
};

export const PeopleTable: FC<Props> = ({
  peopleData,
  selectedPerson,
}) => {
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
        {peopleData.map((person: Person) => {
          const mother = peopleData
            .find(p => p.name === person.motherName);
          const father = peopleData
            .find(p => p.name === person.fatherName);

          return (
            <PersonComponent
              key={person.slug}
              person={person}
              isSelected={person.slug === selectedPerson}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>

  );
};
