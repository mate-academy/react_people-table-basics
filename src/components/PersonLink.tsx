import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother ? (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {mother.name}
          </Link>
        ) : (
          person.motherName ?? '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          person.fatherName ?? '-'
        )}
      </td>
    </tr>
  );
};
