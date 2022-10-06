import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from './PersonLink';

type Props = {
  isLoading: boolean,
  isError: boolean,
  personSlug: string,
  people: Person[],
};

export const PeopleTable: FC<Props> = ({
  isLoading,
  people,
  personSlug,
  isError,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {isLoading
          ? <Loader />
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
                  const {
                    sex, born, died, motherName, fatherName, slug,
                  } = person;

                  const mother = people.find(women => {
                    return motherName === women.name;
                  });
                  const father = people.find(man => fatherName === man.name);

                  return (
                    <tr
                      data-cy="person"
                      key={slug}
                      className={classNames(
                        { 'has-background-warning': personSlug === slug },
                      )}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {mother?.slug === undefined
                          ? (
                            motherName || '-'
                          )
                          : (
                            <PersonLink person={mother} />
                          )}

                      </td>
                      <td>
                        {father?.slug === undefined
                          ? (
                            fatherName || '-'
                          )
                          : (
                            <Link to={`../${father?.slug}`}>
                              {fatherName || '-'}
                            </Link>
                          )}

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !people.length
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

      </div>
    </div>
  );
};
