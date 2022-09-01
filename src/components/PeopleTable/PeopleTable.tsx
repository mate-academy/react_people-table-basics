import cn from 'classnames';
import { useState } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const [selectedPerson, setSelectedPerson] = useState('');

  const findParent = (people: Person[], parentName: string | null) => {
    return people.find(person => person.name === parentName);
  };

  const peopleWithParents = () => {
    return peopleList.map(person => ({
      ...person,
      mother: findParent(peopleList, person.motherName),
      father: findParent(peopleList, person.fatherName),
    }));
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
        {peopleWithParents().map(human => (
          <tr
            className={cn(
              { 'has-background-warning': selectedPerson === human.slug },
            )}
            data-cy="person"
            key={human.slug}
          >
            <td>
              <PersonLink
                person={human}
                handleSelectedPerson={setSelectedPerson}
              />
            </td>

            <td>{human.sex}</td>
            <td>{human.born}</td>
            <td>{human.died}</td>
            <td>
              {human.mother
                ? (
                  <PersonLink
                    person={human.mother}
                    handleSelectedPerson={setSelectedPerson}
                  />
                )
                : human.motherName || '-'}
            </td>
            <td>
              {human.father
                ? (
                  <PersonLink
                    person={human.father}
                    handleSelectedPerson={setSelectedPerson}
                  />
                )
                : human.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
