import classNames from 'classnames';
import React from 'react';

import { Link } from 'react-router-dom';

import { Loader } from './Loader';

import { Person } from '../../types';

type Props = {
  peoples: Person[],
  nickName: string,
  loading: boolean,
  error: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  peoples,
  nickName,
  loading,
  error,
}) => {
  const isSelected = (people: Person) => nickName === people.slug;
  const isWoman = (sex: string) => sex === 'f';

  const handleParentName = (parentName: string | null) => {
    const parent = peoples.find(people => people.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames({
            'has-text-danger': isWoman(parent.sex),
          })}
        >
          {parent.name}
        </Link>
      );
    }

    if (parentName) {
      return parentName;
    }

    return '-';
  };

  return (
    <div className="block">
      <div className="box table-container">
        {(error && !loading) && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!peoples.length && !loading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {(loading && !peoples.length)
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
                {peoples.map(people => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                  } = people;

                  return (
                    <tr
                      className={classNames({
                        'has-background-warning': isSelected(people),
                      })}
                      data-cy="person"
                      key={name}
                    >
                      <td>
                        <Link
                          to={`/people/${slug}`}
                          className={classNames({
                            'has-text-danger': isWoman(sex),
                          })}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>{handleParentName(motherName)}</td>
                      <td>{handleParentName(fatherName)}</td>
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
