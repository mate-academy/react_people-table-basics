import PersonLink from '../components/PersonLink';
import { Person } from '../types/Person';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();

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
          const isActive = location.pathname === `/people/${person.slug}`;

          // const motherSlug = checkMotherArray?.find(
          //   mother => mother.name === person.motherName,
          // );

          // const fatherSlug = checkFatherArray?.find(
          //   father => father.name === person.fatherName,
          // );

          const mother = people?.find(p => p.name === person.motherName);

          const father = people?.find(f => f.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn('', {
                'has-background-warning': isActive,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
