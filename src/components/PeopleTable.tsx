import { FC } from 'react';
import ClassNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  error: string,
  isSelected: string | null,
  setIsSelected: (name: string | null) => void,
};

export const PeopleTable: FC<Props> = ({
  people,
  isSelected,
  setIsSelected,
  error,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>

        {!people
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )
          : (
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
                  const findWomen = people
                    .find(mother => mother.name === person.motherName);
                  const findFather = people
                    .find(father => father.name === person.fatherName);

                  return (
                    <tr
                      className={ClassNames({
                        'has-background-warning': person.name === isSelected,
                      })}
                      data-cy="person"
                    >
                      <PersonLink
                        person={person}
                        findWomen={findWomen}
                        findFather={findFather}
                        handleClick={setIsSelected}
                      />
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
