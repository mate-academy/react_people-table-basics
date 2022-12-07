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
  const selectedHuman = selectedPerson === person.slug;
  const {
    sex, born, died, name, slug, motherName, fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({ 'has-background-warning': selectedHuman })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
          onClick={() => {
            selectedRow(slug);
          }}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <PersonLink
          parent={motherName}
          people={people}
          selectedRow={selectedRow}
          person={person}
        />
      </td>
      <td>
        <PersonLink
          parent={fatherName}
          people={people}
          selectedRow={selectedRow}
          person={person}
        />
      </td>
    </tr>
  );
};
