import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';
import PersonLink from '../PersonLink';

interface Props {
  person: Person;
  selectedPerson: string;
  setSelectedPerson: (str: string) => void;
  findParrent: (str: string) => string | undefined;
}

export const PeopleItem: FC<Props> = ({
  person,
  selectedPerson,
  findParrent,
  setSelectedPerson,
}) => {
  const {
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
      <td><PersonLink person={person} setSelectedPerson/></td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        <NavLink
          to={`/people/${findParrent(motherName || '-')}`}
          style={findParrent(motherName || '-')
            ? { pointerEvents: 'visible' }
            : { pointerEvents: 'none', color: 'gray' }}
          className={classNames({
            'has-text-danger': findParrent(motherName || '-'),
          })}
          onClick={() => setSelectedPerson(
            findParrent(motherName || '-') || '',
          )}
        >
          {motherName || '-'}
        </NavLink>
      </td>
      <td>
        <NavLink
          to={`/people/${findParrent(fatherName || '-')}`}
          style={findParrent(fatherName || '-')
            ? { pointerEvents: 'visible' }
            : { pointerEvents: 'none', color: 'gray' }}
          onClick={() => setSelectedPerson(
            findParrent(fatherName || '-') || '',
          )}
        >
          {fatherName || '-'}
        </NavLink>
      </td>
    </tr>
  );
};
