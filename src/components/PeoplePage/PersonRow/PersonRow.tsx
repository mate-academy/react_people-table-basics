import classNames from 'classnames';
import { Person } from '../../../types';

interface Props {
  person: Person;
  userId: string;
}

export const PersonRow: React.FC<Props> = ({ person, userId }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  const getParentMarkup = (
    parent: Person | undefined,
    parentName: Person['name'] | null,
  ) => {
    if (!parent && !parentName) {
      return '-';
    }

    if (!parent && parentName) {
      return <span>{parentName}</span>;
    }

    return (
      <a
        className={classNames({
          'has-text-danger': parent?.sex === 'f',
        })}
        href={`#/people/${parent?.slug}`}
      >
        {parentName}
      </a>
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': userId === slug,
      })}
    >
      <td>
        <a
          href={`#/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {getParentMarkup(mother, motherName)}
      </td>

      <td>
        {getParentMarkup(father, fatherName)}
      </td>
    </tr>
  );
};
