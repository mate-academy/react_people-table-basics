import { Person } from '../../types';

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
  const findParent = (child: Person) => {
    let parent = people.find(one => one.name === child.motherName);

    if (!parent) {
      parent = people.find(one => one.name === child.fatherName);
    }

    if (!parent) {
      return child;
    }

    return parent;
  };

  return (
    <tr
      data-cy="person"
      className={person.slug === slugUser
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <a
          className={person.sex === 'f'
            ? 'has-text-danger'
            : ''}
          href={`#/people/${person.slug}`}
          onClick={() => {
            return handleSlugUser(person.slug);
          }}
        >
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.motherName !== null ? (
        people.some(one => one.name === person.motherName) ? (
          <td>
            <a
              className="has-text-danger"
              href={`#/people/${findParent(person).slug}`}
              onClick={() => {
                return handleSlugUser(
                  findParent(person).slug,
                );
              }}
            >
              {person.motherName}
            </a>
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
            <a
              href={`#/people/${findParent(person).slug}`}
              onClick={() => {
                return handleSlugUser(
                  findParent(person).slug,
                );
              }}
            >
              {person.fatherName}
            </a>
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
