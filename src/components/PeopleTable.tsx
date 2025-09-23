import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const renderPersonByName = (personName: string | null) => {
    const foundPerson = people.find(person => person.name === personName);

    return foundPerson ? (
      <PersonLink person={foundPerson} />
    ) : (
      personName || '-'
    );
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
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderPersonByName(person.motherName)}</td>
            <td>{renderPersonByName(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
