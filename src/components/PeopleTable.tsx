import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[] | null;
  isLoading: boolean;
  isError: boolean
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  isError,
}) => {
  const { selectedSlug } = useParams();

  const findMother = (person: Person) => {
    if (!people) {
      return null;
    }

    return people.find((mother) => mother.name === person.motherName);
  };

  const findFather = (person: Person) => {
    if (!people) {
      return null;
    }

    return people.find((father) => father.name === person.fatherName);
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (
          <Loader />
        )}

        {isError ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ) : (
          <>
            {!isLoading && !people?.length && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            {!isLoading && !!people?.length && (
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
                    const mother = findMother(person);
                    const father = findFather(person);

                    const {
                      sex,
                      born,
                      died,
                      slug,
                      motherName,
                      fatherName,
                    } = person;

                    return (
                      <tr
                        data-cy="person"
                        key={slug}
                        className={classNames({
                          'has-background-warning': slug === selectedSlug,
                        })}
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        {mother ? (
                          <td>
                            <PersonLink person={mother} />
                          </td>
                        ) : (
                          <td>
                            {motherName || '-'}
                          </td>
                        )}
                        {father ? (
                          <td>
                            <PersonLink person={father} />
                          </td>
                        ) : (
                          <td>
                            {fatherName || '-'}
                          </td>
                        )}
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
  );
};
