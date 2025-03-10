/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// import { Loader } from './Loader';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [click, setClick] = useState<number>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        setPeoples(data);
      } catch (error) {
        console.log('Error get data: ', error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {/* <Loader />
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
          <p data-cy="noPeopleMessage">There are no people on the server</p> */}
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
              {peoples.map((people, index) => (
                <tr
                  data-cy="person"
                  key={index}
                  className={classNames('', {
                    'has-background-warning': index === click,
                  })}
                >
                  <td>
                    <PersonLink
                      name={people.name}
                      slug={people.slug}
                      sex={people.sex}
                      index={index}
                      setClick={setClick}
                    />
                  </td>

                  <td>{people.sex}</td>
                  <td>{people.born}</td>
                  <td>{people.died}</td>
                  <td>
                    <PersonLink name={people.motherName} slug={people.slug} />
                  </td>
                  <td>
                    <PersonLink name={people.fatherName} slug={people.slug} />
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
