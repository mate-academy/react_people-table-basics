import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  people: Person[]
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const { personLink } = useParams();

  const getParentLink = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames(
            { 'has-text-danger': parent.sex === 'f' },
          )}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === personLink },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {getParentLink(motherName)}
      </td>
      <td>
        {getParentLink(fatherName)}
      </td>
    </tr>
  );
};
