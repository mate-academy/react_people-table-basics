import classNames from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from '../../PersonLink';

interface Props {
  people: Person[],
  currentElement: string,
}

export const PeopleList: React.FC<Props> = ({ people, currentElement }) => {
  const findParent = (parent: 'mother' | 'father', person: Person) => {
    const motherName = person.motherName ? person.motherName : '';
    const fatherName = person.fatherName ? person.fatherName : '';

    return parent === 'mother'
      ? people.map(somePerson => somePerson.name)
        .indexOf(motherName)
      : people.map(somePerson => somePerson.name)
        .indexOf(fatherName);
  };

  return (
    <>
      {!people.length ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ) : (
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
                key={person.name}
                className={classNames(
                  {
                    'has-background-warning': person.slug === currentElement,
                  },
                )}
              >
                <PersonLink person={person} />

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {person.motherName ? (
                  <PersonLink
                    person={
                      people[findParent('mother', person)]
                    }
                    personName={person.motherName}
                  />
                ) : (
                  <td>-</td>
                )}
                {person.fatherName ? (
                  <PersonLink
                    person={
                      people[findParent('father', person)]
                    }
                    personName={person.fatherName}
                  />
                ) : (
                  <td>-</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
