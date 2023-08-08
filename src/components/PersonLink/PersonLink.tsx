import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {people.some(human => human.name === person.motherName) ? (
          <Link className="has-text-danger" to={`/people/${person.mother?.slug}`}>{person.motherName}</Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {people.some(human => human.name === person.fatherName) ? (
          <Link to={`/people/${person.father?.slug}`}>{person.fatherName || '-'}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
