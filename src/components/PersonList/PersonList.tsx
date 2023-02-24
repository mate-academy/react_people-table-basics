import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  personas: Person[],
  selectedPersonId: string,
};

export const PersonList: React.FC<Props> = ({
  personas,
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
        {personas.map(person => {
          const mother = personas.find(mom => mom.name === person.motherName);
          const father = personas.find(dad => dad.name === person.fatherName);

          return (
            <tr
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
                {mother
                  ? <PersonLink person={mother} />
                  : `${person.motherName || '-'}`}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : `${person.fatherName || '-'}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
