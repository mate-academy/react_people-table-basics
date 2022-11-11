import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const findParent = (personName: string | null) => {
    const parent = people.find(person => person.name === personName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return personName || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className={'table is-striped is-hoverable'
        + 'is-narrow is-fullwidth'}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{findParent(person.motherName)}</td>
            <td>{findParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
