import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  selectedPerson: string,
  motherInTable: Person | undefined,
  fatherInTable: Person | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  motherInTable,
  fatherInTable,
  selectedPerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames('',
        { 'has-background-warning': selectedPerson === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames('', { 'has-text-danger': person.sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {motherInTable
        ? (
          <td>
            <Link
              to={`/people/${motherInTable.slug}`}
              className={classNames('',
                { 'has-text-danger': motherInTable.sex === 'f' })}
            >
              {motherInTable.name}
            </Link>
          </td>
        )
        : (
          <td>
            {!motherName ? '-' : motherName}
          </td>
        )}

      {fatherInTable
        ? (
          <td>
            <Link
              to={`/people/${fatherInTable.slug}`}
            >
              {fatherInTable.name}
            </Link>
          </td>
        )
        : (
          <td>
            {!fatherName ? '-' : fatherName}
          </td>
        )}
    </tr>
  );
};
