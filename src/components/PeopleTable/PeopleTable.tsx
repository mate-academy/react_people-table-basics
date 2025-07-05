import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const slugParam = useParams<{ slug?: string }>();

  function createSlug(person: Person, who: string) {
    const parentPerson = people.find(p => {
      if (who === 'mother') {
        return p.name === person.motherName;
      } else {
        return p.name === person.fatherName;
      }
    });

    return parentPerson;
  }

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
              data-cy="person"
              key={person.name}
              className={
                slugParam.slug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <Link
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={`/people/${person.slug}`}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {createSlug(person, 'mother')?.slug === undefined &&
                  person.motherName}

                {createSlug(person, 'mother')?.slug !== undefined && (
                  <Link
                    className="has-text-danger"
                    to={`/people/${createSlug(person, 'mother')?.slug}`}
                  >
                    {person.motherName}
                  </Link>
                )}
              </td>

              <td>
                {createSlug(person, 'father')?.slug === undefined &&
                  person.fatherName}
                {createSlug(person, 'father')?.slug !== undefined && (
                  <Link to={`/people/${createSlug(person, 'father')?.slug}`}>
                    {person.fatherName}
                  </Link>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
