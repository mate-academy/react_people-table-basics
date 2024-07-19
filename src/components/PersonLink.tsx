import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  selectedPerson: string;
  getMotherSlug: (person: Person) => string;
  getFaterSlug: (person: Person) => string;
};

export const PersonLink: React.FC<Props> = ({
  person,
  selectedPerson,
  getMotherSlug,
  getFaterSlug,
}) => {
  return (
    <tr
      data-cy="person"
      key={person.name}
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.motherName ? (
          getMotherSlug(person) ? (
            <Link
              className="has-text-danger"
              to={`/people/${getMotherSlug(person)}`}
            >
              {person.motherName}
            </Link>
          ) : (
            <span>{person.motherName}</span>
          )
        ) : (
          <span>-</span>
        )}
      </td>

      <td>
        {person.fatherName ? (
          getFaterSlug(person) ? (
            <Link to={`/people/${getFaterSlug(person)}`}>
              {person.fatherName}
            </Link>
          ) : (
            <span>{person.fatherName}</span>
          )
        ) : (
          <span>-</span>
        )}
      </td>
    </tr>
  );
};
