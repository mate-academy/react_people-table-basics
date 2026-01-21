import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  const renderPersonCell = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const foundPerson = people.find(p => p.name === name);

    return foundPerson ? <PersonLink person={foundPerson} /> : name;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
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
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>{renderPersonCell(person.name)}</td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonCell(person.motherName)}</td>
            <td>{renderPersonCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
