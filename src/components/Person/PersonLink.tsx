import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonLink: React.FC<Props> = ({ person, isSelected }) => {
  const {
    slug, name, born, died, sex,
    mother, motherName, father, fatherName,
  } = person;

  const hasParent = (parentName: string | null, parent: Person |
  undefined) => {
    if (parent) {
      return (
        <NavLink
          to={`/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name}
        </NavLink>
      );
    }

    return parentName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >

      <td>
        <NavLink
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>{hasParent(motherName, mother)}</td>
      <td>{hasParent(fatherName, father)}</td>
    </tr>
  );
};
