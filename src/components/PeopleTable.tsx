import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedPerson?: Person;
};

export const PeopleTable = ({ people, selectedPerson }: Props) => {
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
          const mother = people.find(
            personFromList => personFromList.name === person.motherName,
          );

          const father = people.find(
            personFromList => personFromList.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === selectedPerson?.slug,
              })}
            >
              <td>
                <PersonLink person={person} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} people={people} />
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} people={people} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
