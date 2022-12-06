import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person
  people: Person[]
  selectedPerson: string
  selectedRow: (personSlag: string) => void
};

export const PersonInfo: React.FC<Props> = ({
  person,
  people,
  selectedRow,
  selectedPerson,
}) => {
  const gg = selectedPerson === person.slug;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({ 'has-background-warning': gg })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
          onClick={() => {
            selectedRow(person.slug);
          }}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonLink
          parent={person.motherName}
          people={people}
          selectedRow={selectedRow}
          person={person}
        />
      </td>
      <td>
        <PersonLink
          parent={person.fatherName}
          people={people}
          selectedRow={selectedRow}
          person={person}
        />
      </td>
    </tr>
  );
};
