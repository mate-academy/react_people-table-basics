import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  isLoading: boolean,
  people: Person[],
  error: boolean,
};

export const PeopleTable: React.FC<Props> = ({ isLoading, people, error }) => {
  const { slug: selectedSlug } = useParams();

  const findParent = (
    guys: Person[], parentName: string | null,
  ) => {
    return guys.find(({ name }) => name === parentName) || null;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader />
            : (
              <>
                {(error === true) && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {(error === false) && (
                  <table
                    data-cy="peopleTable"
                    className="table
                      is-striped
                      is-hoverable
                      is-narrow is-fullwidth
                    "
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
                      {people.map((person) => {
                        const {
                          slug, sex, born, died, fatherName, motherName,
                        } = person;

                        const mother = findParent(people, motherName);
                        const father = findParent(people, fatherName);

                        return (
                          <tr
                            data-cy="person"
                            className={classNames(
                              {
                                'has-background-warning': selectedSlug === slug,
                              },
                            )}
                          >
                            <td>
                              <PersonLink person={person} />
                            </td>

                            <td>{sex}</td>
                            <td>{born}</td>
                            <td>{died}</td>
                            <td>
                              {mother ? <PersonLink person={mother} />
                                : motherName || '-'}
                            </td>
                            <td>
                              {father ? <PersonLink person={father} />
                                : fatherName || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
