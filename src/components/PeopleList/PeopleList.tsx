import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  people: Person[],
}

export const PeopleList: React.FC<Props> = ({
  people,
}) => {
  const { slug } = useParams();

  const findRelativeParents = (name: string | null) => {
    const personToFind = people.find(person => person.name === name);

    if (personToFind) {
      return (
        <Link
          to={`/people/${personToFind.slug}`}
          className={classNames(
            { 'has-text-danger': personToFind.sex === 'f' },
          )}
        >
          {personToFind.name}
        </Link>
      );
    }

    return name || '-';
  };

  return (
    <tbody>
      {
        people.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames(
              {
                'has-background-warning': slug === person.slug,
              },
            )}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
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
              {findRelativeParents(person.motherName)}
            </td>
            <td>
              {findRelativeParents(person.fatherName)}
            </td>
          </tr>
        ))
      }
    </tbody>
  );
};
