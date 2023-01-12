import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  isSelected: boolean,
};

export const PersonLink = ({ person, isSelected }: Props) => {
  const {
    name, sex, born, died,
    slug, fatherName, motherName, father, mother,
  } = person;

  const renderParent
  = (parent: Person | undefined, parentName: string | null) => (
    parent
      ? (
        <NavLink
          to={`../${parent.slug}`}
          className={classNames({
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name}
        </NavLink>
      )
      : parentName || '-'
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <NavLink
          to={`../${slug}`}
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
      <td>{renderParent(mother, motherName)}</td>
      <td>{renderParent(father, fatherName)}</td>
    </tr>
  );
};
