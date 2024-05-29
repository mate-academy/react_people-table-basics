import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

type Role = 'father' | 'mother';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const parent = (person: Person, role: Role) => {
    const parentName =
      role === 'father' ? person.fatherName : person.motherName;
    const parentInList = people.find(p => p.name === parentName);

    if (!parentName) {
      return '-';
    }

    if (parentInList) {
      return <PersonLink person={parentInList} />;
    }

    return parentName;
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
        {people.map(person => {
          return (
            <tr
              className={slug === person.slug ? 'has-background-warning' : ''}
              key={person.slug}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{parent(person, 'mother')}</td>
              <td>{parent(person, 'father')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
