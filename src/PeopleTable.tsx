import { Person } from './types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => {
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink people={people} person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.find(current => current.name === person.motherName) ? (
                  <PersonLink
                    people={people}
                    person={
                      people.find(
                        current => current.name === person.motherName,
                      )!
                    }
                  />
                ) : (
                  <span>{person.motherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.find(current => current.name === person.fatherName) ? (
                  <PersonLink
                    people={people}
                    person={
                      people.find(
                        current => current.name === person.fatherName,
                      )!
                    }
                  />
                ) : (
                  <span>{person.fatherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
