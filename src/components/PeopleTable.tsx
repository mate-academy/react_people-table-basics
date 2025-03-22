import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  errorMessage: boolean;
  people: Person[];
  loader: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  errorMessage,
  people,
  loader,
}) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !loader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {people.length > 0 && !loader && (
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
                {people.map((person, id) => {
                  const mother = people.find(p => p.name === person.motherName);
                  const father = people.find(p => p.name === person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={id}
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}
                    >
                      <td>
                        <PersonLink
                          person={person}
                          name={person.name}
                          people={people}
                        />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        <PersonLink
                          person={mother ? mother : person}
                          name={person.motherName ? person.motherName : '-'}
                          people={people}
                        />
                      </td>
                      <td>
                        <PersonLink
                          person={father ? father : person}
                          name={person.fatherName ? person.fatherName : '-'}
                          people={people}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
