import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

export type PropsPeopleTable = {
  people: Person[],
};

export const PeopleTable: React.FC<PropsPeopleTable> = ({ people }) => {
  const { slug } = useParams();

  const FindParentOfPerson = (parentName: string | null) => {
    return people.find((human: Person) => human.name === parentName);
  };

  return people.length > 0
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
          {people.map(person => {
            return (
              <tr
                key={person.name}
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {person.motherName
                  ? (
                    <td>
                      {FindParentOfPerson(person.motherName)
                        ? (
                          <PersonLink
                            person={FindParentOfPerson(person.motherName)}
                          />
                        )
                        : person.motherName}
                    </td>
                  )
                  : <td>-</td>}

                {person.fatherName
                  ? (
                    <td>
                      {FindParentOfPerson(person.fatherName)
                        ? (
                          <PersonLink
                            person={FindParentOfPerson(person.fatherName)}
                          />
                        )
                        : person.fatherName}
                    </td>
                  )
                  : <td>-</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    )
    : (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
};
