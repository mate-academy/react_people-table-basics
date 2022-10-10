import { FC } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';
import PersonLink from '../PersonLink';

interface Props {
  person: Person;
  selectedPerson: string;
  findParrent: (str: string) => string | undefined;
}

export const PeopleItem: FC<Props> = ({
  person,
  selectedPerson,
  findParrent,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === selectedPerson },
      )}
    >
      <td><PersonLink person={person} /></td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <NavLink
          to={`/people/${findParrent(motherName || '-')}`}
          style={findParrent(motherName || '-')
            ? { pointerEvents: 'd' }
            : { pointerEvents: 'none' }}
        >
          {motherName || '-'}
        </NavLink>
      </td>
      <td><Link to={`/people/${slug}`}>{fatherName || '-'}</Link></td>
    </tr>
  );
};
