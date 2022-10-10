import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
  selectedPerson: string;
}

export const PeopleItem: FC<Props> = ({
  person,
  selectedPerson,
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
      <td>
        <Link
          to="#/people/jan-van-brussel-1714"{}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName || '-'}</td>
      <td>{fatherName || '-'}</td>
    </tr>
  );
};
