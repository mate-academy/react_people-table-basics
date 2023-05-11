import classNames from 'classnames';
import { Person } from '../../../types';
import { PersonLink } from '../../PersonLink';

interface Props {
  people: Person[],
  currentElement: string,
}

const findParent = (
  parent: 'mother' | 'father', person: Person, people: Person[],
) => {
  return parent === 'mother'
    ? people.find(somePerson => somePerson.name === person.motherName)
    : people.find(somePerson => somePerson.name === person.fatherName);
};

export const PeopleList: React.FC<Props> = ({ people, currentElement }) => {
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
                      findParent('mother', person, people)
                    }
                    personName={person.motherName}
                  />
                ) : (
                  <td>-</td>
                )}
                {person.fatherName ? (
                  <PersonLink
                    person={
                      findParent('father', person, people)
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
