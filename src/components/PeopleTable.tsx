import { Person } from '../api';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const findByName = (name: string | null) => people.find(p => p.name === name);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'].map(col => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const { sex, born, died, name, slug, motherName, fatherName } =
            person;
          const rowClass =
            slug === selectedSlug ? 'has-background-warning' : '';
          const mother = motherName ? findByName(motherName) : undefined;
          const father = fatherName ? findByName(fatherName) : undefined;

          return (
            <tr key={slug} data-cy="person" className={rowClass}>
              <td>
                <PersonLink person={person} name={name} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName ? (
                  <PersonLink person={mother} name={motherName} />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {fatherName ? (
                  <PersonLink person={father} name={fatherName} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
