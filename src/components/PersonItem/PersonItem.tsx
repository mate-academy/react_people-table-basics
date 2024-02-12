import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { Person } from '../../types';
import { PeopleContext } from '../../store/PeopleContext';

type Props = {
  person: Person,
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { peoples } = useContext(PeopleContext);
  const { personSlug } = useParams();

  const selectedPerson = personSlug || null;

  function hasParentLink(parentName: string | null) {
    const hasParent = peoples.find(p => p.name === parentName);

    return hasParent !== undefined;
  }

  function findParentSlug(parentName: string | null) {
    const parent = peoples.find(p => p.name === parentName);

    if (parent === null) {
      return '';
    }

    return parent?.slug;
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {hasParentLink(person.motherName) ? (
        <td>
          <Link
            to={`/people/${findParentSlug(person.motherName)}`}
            className={classNames({
              'has-text-danger': hasParentLink(person.motherName),
            })}
          >
            { person.motherName}

          </Link>
        </td>
      ) : (
        <td>
          { person.motherName || '-' }
        </td>
      )}

      {hasParentLink(person.fatherName) ? (
        <td>
          <Link
            to={`/people/${findParentSlug(person.fatherName)}`}
          >
            { person.fatherName}

          </Link>
        </td>
      ) : (
        <td>
          { person.fatherName || '-' }
        </td>
      )}
    </tr>
  );
};
