import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  selectedPerson: string,
};

export const PersonList: React.FC<Props> = ({
  person,
  selectedPerson,
}) => {
  const isSelected = selectedPerson === person.slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink
          to={person.slug}
          name={person.name}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <PersonLink
              to={person.mother?.slug}
              name={person.motherName}
              sex={person.mother.sex}
            />
          ) : (
            person.motherName || '-'
          )}
      </td>
      <td>
        {person.father
          ? (
            <PersonLink
              to={person.father?.slug}
              name={person.fatherName}
              sex={person.father.sex}
            />
          ) : (
            person.fatherName || '-'
          )}
      </td>
    </tr>
  );
};
