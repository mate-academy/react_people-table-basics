import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

function renderParent(
  parentName: string | null,
  parentPerson: Person | undefined,
): string | JSX.Element {
  if (!parentName) {
    return '-';
  }

  if (!parentPerson) {
    return parentName;
  }

  return (
    <Link
      className={classNames({
        'has-text-danger': parentPerson.sex === 'f',
      })}
      to={`/people/${parentPerson.slug}`}
    >
      {parentPerson.name}
    </Link>
  );
}

export default function PersonLink({ person }: { person: Person }) {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParent(person.motherName, person.mother)}</td>
      <td>{renderParent(person.fatherName, person.father)}</td>
    </tr>
  );
}
