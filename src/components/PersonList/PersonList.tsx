import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  selectedPersonId: string,
};

export const PersonList: React.FC<Props> = ({
  people,
  selectedPersonId,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPersonId;

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
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td className={classNames(
                { 'has-text-danger': person.sex === 'f' },
              )}
              >
                {person.sex}
              </td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? <PersonLink person={person.mother} />
                  : `${person.motherName || '-'}`}
              </td>
              <td>
                {person.father
                  ? <PersonLink person={person.father} />
                  : `${person.fatherName || '-'}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
