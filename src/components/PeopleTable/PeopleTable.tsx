// import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  // const { personSlug } = useParams();

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
          const mother = people.find(
            ({ name }) => name === person.motherName,
          );
          const father = people.find(
            ({ name }) => name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  // eslint-disable-next-line no-nested-ternary
                  mother
                    ? <PersonLink person={mother} />
                    : person.motherName
                      ? person.motherName
                      : '-'
                }
              </td>
              <td>
                {
                  // eslint-disable-next-line no-nested-ternary
                  father
                    ? <PersonLink person={father} />
                    : person.fatherName
                      ? person.fatherName
                      : '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
