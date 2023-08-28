import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

/* eslint-disable no-nested-ternary */
type Props = {
  person: Person,
  people: Person[];
  handleSlugUser: (value: string) => void;
  slugUser: string;
};

export const PersonItem = ({
  person,
  people,
  handleSlugUser,
  slugUser,
}:Props) => {
  return (
    <tr
      data-cy="person"
      className={person.slug === slugUser
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <PersonLink
          person={person}
          handleSlugUser={handleSlugUser}
          people={people}
          isParent="no"
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.motherName !== null ? (
        people.some(one => one.name === person.motherName) ? (
          <td>
            <PersonLink
              person={person}
              handleSlugUser={handleSlugUser}
              people={people}
              isParent="mother"
            />
          </td>
        ) : (
          <td>{person.motherName}</td>
        )
      ) : (
        <td>-</td>
      )}
      {person.fatherName !== null ? (
        people.some(one => one.name === person.fatherName) ? (
          <td>
            <PersonLink
              person={person}
              handleSlugUser={handleSlugUser}
              people={people}
              isParent="father"
            />
          </td>
        ) : (
          <td>{person.fatherName}</td>
        )
      ) : (
        <td>-</td>
      )}
    </tr>
  );
};
