import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
}

const findPersonByName = (
  name: string | null,
  people: Person[],
): Person | string | null => {
  return people.find(person => person.name === name) || name;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { personSlug: selectedPerson } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth"
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
            className={cn({
              'has-background-warning': person.slug === selectedPerson,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={findPersonByName(person.motherName, people)}
              />
            </td>
            <td>
              <PersonLink
                person={findPersonByName(person.fatherName, people)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
