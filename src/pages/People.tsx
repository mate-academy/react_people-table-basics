import React, { useEffect, useState } from "react";
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const People = () => {
  const [people, setPeople] = useState<null | Person[]>(null);
  const [loadingModalIcon, setLoadingModalIcon] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setErrorMessage(false);
    getPeople()
      .then(setPeople)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoadingModalIcon(false));
  }, []);

  const findPeople = (curentNeme: string | null) => {
    const parent = people?.find(person => person.name === curentNeme)

    if (parent) {
      console.log(parent);

      return (
        <PersonLink parent={parent} />
      )
    }

    return curentNeme || "-"
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loadingModalIcon ? <Loader /> : (

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
                {people?.length !== 0 ? people?.map(person => {
                  const { name, sex, born, died, motherName, fatherName } = person;
                  return (
                    <tr
                      data-cy="person"
                      key={name}
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}>
                      <td>
                        <NavLink to={`/people/${person.slug}`} className={classNames({
                          'has-text-danger': sex === 'f',
                        })}>
                          {name}
                        </NavLink>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>

                      <td>{findPeople(motherName)}</td>

                      <td>{findPeople(fatherName)}</td>
                    </tr>
                  )
                }) : (
                  <p data-cy="noPeopleMessage">There are no people on the server</p>
                )}
              </tbody>
            </table>
          )}


          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
