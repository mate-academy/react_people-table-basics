import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[],
  person: Person,
  getIsSelected: (person: Person) => boolean,
};

export const PersonLink: React.FC<Props> = ({
  people, person, getIsSelected,
}) => {
  const mother = people.find(pers => pers.name === person.motherName);
  const father = people.find(pers => pers.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': getIsSelected(person) },
      )}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames(
            { 'has-text-danger': person.sex === 'f' },
          )}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (
            <Link
              className={classNames(
                { 'has-text-danger': mother.sex === 'f' },
              )}
              to={`../${mother.slug}`}
            >
              {person.motherName}
            </Link>
          )
          : (
            <p>
              {person.motherName || '-'}
            </p>
          )}
      </td>
      <td>
        {father
          ? (
            <Link
              to={`../${father.slug}`}
            >
              {person.fatherName}
            </Link>
          )
          : (
            <p>
              {person.fatherName || '-'}
            </p>
          )}
      </td>
    </tr>
  );
};
