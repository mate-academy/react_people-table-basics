import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[]
}

export const PeopleTab: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findPerson = (name: string) => {
    return people.find((pers => pers.name === name));
  };

  return (
    people.length > 0
      ? (
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
            {people.map((person) => (
              <>
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <PersonLink person={person} />

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  {person.motherName ? (
                    <PersonLink
                      person={findPerson(person.motherName)}
                      parentName={person.motherName}
                    />
                  ) : (
                    <td>-</td>
                  )}
                  {person.fatherName ? (
                    <PersonLink
                      person={findPerson(person.fatherName)}
                      parentName={person.fatherName}
                    />
                  ) : (
                    <td>-</td>
                  )}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )
      : (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )
  );
};
