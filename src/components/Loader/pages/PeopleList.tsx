import classNames from 'classnames';
import { useState } from 'react';
import { Person } from '../../../types';
import { Loader } from '../Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[] | null;
  errorMessage: string;
};

export const PeopleList: React.FC<Props> = ({
  people,
  errorMessage,
}) => {
  const [select, setSelect] = useState<string>('');

  const findParents = (
    parentName: string | null,
  ): string | JSX.Element | null => {
    const parentObj = people?.find(({ name }) => name === parentName);

    return parentObj
      ? (
        <PersonLink
          person={parentObj}
          setSelectedSlug={setSelect}
        />
      )
      : parentName;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {(!people && !errorMessage.length) && (
            <Loader />
          )}

          {errorMessage.length > 0 && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {(people?.length !== 0)
            ? (
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
                  {people?.map(person => (
                    <tr
                      data-cy="person"
                      className={classNames(
                        { 'has-background-warning': select === person.slug },
                      )}
                      key={person.slug}
                    >
                      <td>
                        <PersonLink
                          person={person}
                          setSelectedSlug={setSelect}
                        />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {findParents(person.motherName) || '-'}
                      </td>
                      <td>
                        {findParents(person.fatherName) || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
            : (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
        </div>
      </div>
    </>
  );
};
