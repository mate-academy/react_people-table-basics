import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

enum PersonSex {
  sex = 'f',
}

export const PersonPage: React.FC<Props> = ({ person, people }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { slugId } = useParams();

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slugId === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === PersonSex.sex,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td
        className={classNames({
          'has-text-danger': sex === PersonSex.sex,
        })}
      >
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {name}
          </Link>
        ) : (
          person?.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{name}</Link>
        ) : (
          person?.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
