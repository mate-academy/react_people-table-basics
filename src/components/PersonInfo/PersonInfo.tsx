import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[],
};

export const PersonInfo: React.FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  const { personSlug } = useParams();

  const mother = people.find(
    (human) => human.name === person.motherName,
  );
  const father = people.find(
    (human) => human.name === person.fatherName,
  );

  const isSelected = slug === personSlug;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>
        {sex}
      </td>

      <td>
        {born}
      </td>

      <td>
        {died}
      </td>

      <td>
        {mother ? (
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      {father ? (
        <td>
          <Link to={`../${father.slug}`}>
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
