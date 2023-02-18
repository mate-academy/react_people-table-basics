import classNames from 'classnames';
import { useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  errorMessage: string,
  loading: boolean,
};

export const PeopleTable: React.FC<Props> = (
  { people, errorMessage, loading },
) => {
  const [selected, setSelected] = useState<Person | null>();

  function parentName(name: string | null) {
    return people.find(p => p.name === name) || null;
  }

  function selectedPerson(person: Person) {
    setSelected(people.find(p => p.name === person.name));
  }

  return (
    <div className="block">
      {loading
        ? (
          <div className="box table-container"><Loader /></div>
        )
        : (
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>

            {people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            <table
              data-cy="peopleTable"
              // eslint-disable-next-line max-len
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
                  const mother = parentName(person.motherName);
                  const father = parentName(person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      onClick={() => {
                        selectedPerson(person);
                      }}
                      className={classNames({
                        'has-background-warning':
                        person.name === selected?.name,
                      })}
                    >
                      <PersonLink person={person} />

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      {mother
                        ? (
                          <PersonLink person={mother} />
                        )
                        : (<td>{person.motherName || '-'}</td>)}

                      {father
                        ? (
                          <PersonLink person={father} />
                        )
                        : (<td>{person.fatherName || '-'}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};
