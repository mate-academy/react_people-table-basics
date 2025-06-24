import { Person } from '../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const renderParentCell = (parentName?: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const { slug } = useParams();

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
        {people.length === 0 ? (
          <tr>
            <td data-cy="noPeopleMessage">There are no people on the server</td>
          </tr>
        ) : (
          people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': person.slug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{renderParentCell(person.motherName)}</td>
              <td>{renderParentCell(person.fatherName)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
