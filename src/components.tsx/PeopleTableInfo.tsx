import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  findParent: (name: string) => Person | undefined;
  onSelectedPerson: string | undefined;
}
export const PeopleTableInfo: React.FC<Props> = ({
  person,
  findParent,
  onSelectedPerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,

  } = person;

  const isSelctedPerson = (curentPerson: Person) => (
    curentPerson.slug === onSelectedPerson
  );

  const findFatherHref = fatherName
    ? findParent(fatherName)
    : undefined;

  const findMotherHref = motherName
    ? findParent(motherName)
    : undefined;

  return (
    <tr
      key={name}
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelctedPerson(person) },
      )}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {findMotherHref
        ? (
          <td>
            <PersonLink
              person={findMotherHref}
            />
          </td>
        ) : (
          <td>
            {motherName || '-'}
          </td>
        )}
      {findFatherHref
        ? (
          <td>
            <PersonLink
              person={findFatherHref}
            />
          </td>
        ) : (
          <td>
            {fatherName || '-'}
          </td>
        )}
    </tr>
  );
};
