import classNames from 'classnames';
import { useParams } from 'react-router';
import { Person } from '../../../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

const fields = [
  { id: 1, fieldName: 'Name' },
  { id: 2, fieldName: 'Sex' },
  { id: 3, fieldName: 'Born' },
  { id: 4, fieldName: 'Died' },
  { id: 5, fieldName: 'Mother' },
  { id: 6, fieldName: 'Father' },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field.id}>{field.fieldName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            key={person.slug}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName ?? '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName ?? '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
