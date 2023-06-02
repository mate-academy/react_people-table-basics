import classNames from 'classnames';
import { Person } from './types';
import { PersonLink } from './PersonLink';

type Props = {
  activePerson: Person | null,
  setActivePerson(person: Person): void,
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  activePerson,
  setActivePerson,
  people,
}) => {
  return (
    <>
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>

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
              className={classNames(
                '',
                {
                  'has-background-warning':
                  person.slug === activePerson?.slug,
                },
              )}
            >
              <td>
                <PersonLink
                  person={person}
                  name={person.name}
                  sex={person.sex}
                  setActivePerson={setActivePerson}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName
                  && people.find(woman => woman.name === person.motherName) && (
                  <PersonLink
                    person={people.find(
                      woman => woman.name === person.motherName,
                    )}
                    name={person.motherName}
                    sex="f"
                    setActivePerson={setActivePerson}
                  />
                )}

                {person.motherName
                  && !people.find(
                    woman => woman.name === person.motherName,
                  ) && (
                  `${person.motherName}`
                )}

                {!person.motherName
                  && !people.find(
                    woman => woman.name === person.motherName,
                  ) && (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName
                  && people.find(man => man.name === person.fatherName) && (
                  <PersonLink
                    person={people.find(man => man.name === person.fatherName)}
                    name={person.fatherName}
                    sex="m"
                    setActivePerson={setActivePerson}
                  />
                )}

                {person.fatherName
                  && !people.find(man => man.name === person.fatherName) && (
                  `${person.fatherName}`
                )}

                {!person.fatherName
                  && !people.find(man => man.name === person.fatherName) && (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
