import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PersonTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

  const getPersonWithParents = () => {
    return people.map(person => {
      const mother = people.find(item => item.name === person.motherName);
      const father = people.find(item => item.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });
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
        {getPersonWithParents().map(item => {
          return (
            <tr
              className={item.slug === personId ? 'has-background-warning' : ''}
              data-cy="person"
              key={item.slug}
            >
              <td>
                <PersonLink person={item} />
              </td>

              <td>{item.sex}</td>
              <td>{item.born}</td>
              <td>{item.died}</td>
              <td>
                {item.mother ? (
                  <PersonLink person={item.mother} />
                ) : (
                  <>{!item.motherName ? '-' : item.motherName}</>
                )}
              </td>
              <td>
                {item.father ? (
                  <PersonLink person={item.father} />
                ) : (
                  <>{!item.fatherName ? '-' : item.fatherName}</>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
