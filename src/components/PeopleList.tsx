import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';
import classNames from 'classnames';
import { usePeople } from '../store/PeopleContext';

// function isPersonFemale(persons: Person[], name: string | null) {
//   if (name === null) {
//     return false;
//   }
//   return persons.find(person => person.name === name && person.sex === 'f') ===
//     undefined
//     ? false
//     : true;
// }
function isPersonFemale(person: Person | undefined): boolean {
  return person?.sex === 'f';
}

function findPersonByName(
  people: Person[],
  name: string | null,
): Person | undefined {
  return people.find(person => person.name === name);
}

export const PeopleList = () => {
  const { slug } = useParams();
  const selectedPerson = slug || 'notSelected';
  const { people, isLoading, errorMsg } = usePeople();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="block">
      <div className="box table-container">
        {/* {isLoading && <Loader />} */}
        {errorMsg && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMsg}
          </p>
        )}
        {!isLoading && !errorMsg && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
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
                const mother = findPersonByName(people, person.motherName);
                const father = findPersonByName(people, person.fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={person.name}
                    className={classNames('', {
                      'has-background-warning': selectedPerson === person.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {mother ? (
                        <Link
                          to={`/people/${mother.slug}`}
                          className={classNames({
                            'has-text-danger': isPersonFemale(mother),
                          })}
                        >
                          {mother.name}
                        </Link>
                      ) : (
                        person.motherName || ' - '
                      )}
                    </td>

                    <td>
                      {father ? (
                        <Link
                          to={`/people/${father.slug}`}
                          className={classNames({
                            'has-text-danger': isPersonFemale(father),
                          })}
                        >
                          {father.name}
                        </Link>
                      ) : (
                        person.fatherName || ' - '
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
