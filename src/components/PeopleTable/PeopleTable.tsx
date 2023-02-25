import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  isSuccess: boolean,
  isLoading: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isSuccess,
  isLoading,
}) => {
  const { userSlug } = useParams();

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuccess) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <div className="block">
      <div className="box table-container">
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
            {
              people.map((person) => {
                const {
                  slug,
                  sex,
                  born,
                  died,
                  motherName,
                  fatherName,
                } = person;

                const mother = people.find((human) => (
                  human.name === motherName
                ));

                const father = people.find((human) => (
                  human.name === fatherName
                ));

                const isSelected = userSlug === slug;

                return (
                  <tr
                    data-cy="person"
                    key={slug}
                    className={classNames(
                      { 'has-background-warning': isSelected },
                    )}
                  >
                    <td>
                      <PersonLink
                        person={person}
                      />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>

                    <td>
                      {
                        mother
                          ? (
                            <PersonLink
                              person={mother}
                            />
                          ) : (
                            <span>{motherName || '-'}</span>
                          )
                      }
                    </td>

                    <td>
                      {
                        father
                          ? (
                            <PersonLink
                              person={father}
                            />
                          ) : (
                            <span>{fatherName || '-'}</span>
                          )
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

      </div>
    </div>
  );
};
