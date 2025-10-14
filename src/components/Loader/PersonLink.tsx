import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink = ({ person, people }: Props) => {
  const { slug } = useParams();
  const isSelected = slug === person.slug;

  const mother = people.find(
    per =>
      person.motherName?.toLowerCase().trim().replaceAll(' ', '-') +
        `-${per.born}` ===
      per.slug,
  );

  const father = people.find(
    per =>
      person.fatherName?.toLowerCase().trim().replaceAll(' ', '-') +
        `-${per.born}` ===
      per.slug,
  );

  const isWomen = person.sex === 'f';

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={isWomen ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
