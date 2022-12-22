import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';

type Props = {
  people: Person[];
  isLoading: boolean;
  selectedPerson:string;
};

export const PeopleTable: FC<Props> = ({
  people,
  isLoading,
  selectedPerson,
}) => {
  const isSelected = (person: Person) => (person.slug === selectedPerson);
  const isMale = (person: Person) => (person.sex === 'm');
  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    return parent !== undefined ? parent.slug : 'not-found';
  };

  return (
    <>
      <div className="block">
        <div className="box table-container">
          {isLoading
            ? (<Loader />)
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
                  {people.map(person => (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning': isSelected(person),
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={classNames({
                            'has-text-danger': !isMale(person),
                          })}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {findParent(person.motherName) !== 'not-found'
                          ? (
                            <Link
                              // to={`/people/elisabeth-haverbeke-1711`}
                              to={`/people/${findParent(person.motherName)}`}
                              className="has-text-danger"
                            >
                              {person.motherName}
                            </Link>
                          )
                          : (
                            <>
                              {person.motherName === null
                                ? '-'
                                : person.motherName}
                            </>
                          )}
                      </td>
                      <td>
                        {findParent(person.fatherName) !== 'not-found'
                          ? (
                            <Link
                              // to={`/people/elisabeth-haverbeke-1711`}
                              to={`/people/${findParent(person.fatherName)}`}
                            >
                              {person.fatherName}
                            </Link>
                          )
                          : (
                            <>
                              {person.fatherName === null
                                ? '-'
                                : person.fatherName}
                            </>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </>
  );
};
