import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';

export type PropsPeopleTable = {
  people: Person[],
};

export const PeopleTable: React.FC<PropsPeopleTable> = ({ people }) => {
  const { slug } = useParams();

  const findParentOfPerson = useMemo(() => {
    return (parentName: string | null) => {
      return people.find((person: Person) => person.name === parentName);
    };
  }, []);

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
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
          const personMother = findParentOfPerson(person.motherName);
          const personFather = findParentOfPerson(person.fatherName);

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
                    {personMother
                      ? (
                        <PersonLink
                          person={personMother}
                        />
                      )
                      : person.motherName}
                  </td>
                )
                : <td>-</td>}

              {person.fatherName
                ? (
                  <td>
                    {personFather
                      ? (
                        <PersonLink
                          person={personFather}
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
  );
};
