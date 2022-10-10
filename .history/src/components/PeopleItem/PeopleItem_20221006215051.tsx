import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import PersonLink from '../PersonLink';

interface Props {
  person: Person;
  selectedPerson: string;
  setSelectedPerson: (str: string) => void;
}

export const PeopleItem: FC<Props> = ({
  person,
  selectedPerson,
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

  const findMother = () 

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
        <Link
          to={`/people/${slug}`}
          onClick={() => {
            setSelectedPerson(selectedPerson);
          }}
        >
          {motherName || '-'}
        </Link>
      </td>
      <td><Link to={`/people/${slug}`}>{fatherName || '-'}</Link></td>
    </tr>
  );
};
