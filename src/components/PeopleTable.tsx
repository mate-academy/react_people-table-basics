/* eslint-disable no-param-reassign */
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

  people.forEach(person => {
    if (person.motherName) {
      const mother = people.find(woman => woman.name === person.motherName);

      if (mother) {
        person.mother = mother;
      }
    }

    if (person.fatherName) {
      const father = people.find(man => man.name === person.fatherName);

      if (father) {
        person.father = father;
      }
    }
  });

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
          const mother = person.motherName ? person.motherName : '-';
          const father = person.fatherName ? person.fatherName : '-';

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={
                person.slug === personId ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  person.mother
                    ? <PersonLink person={person.mother} />
                    : mother
                }
              </td>
              <td>
                {
                  person.father
                    ? <PersonLink person={person.father} />
                    : father
                }
              </td>
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};
