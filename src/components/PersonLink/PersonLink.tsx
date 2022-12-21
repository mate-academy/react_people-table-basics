import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonLink: React.FC<Props> = ({ person, isSelected }) => {
  const {
    slug, name, born, died, sex,
    motherName, mother, fatherName, father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
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
        {mother
          ? (
            <a
              className="has-text-danger"
              href={`#/people/${mother.slug}`}
            >
              {mother.name}
            </a>
          ) : (
            motherName || '-'
          )}
      </td>

      <td>
        {father
          ? (
            <a
              href={`#/people/${father.slug}`}
            >
              {father.name}
            </a>
          ) : (
            fatherName || '-'
          )}
      </td>
    </tr>
  );
};
