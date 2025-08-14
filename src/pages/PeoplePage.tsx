import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();

  const [loader, setLoader] = useState(false);
  const [people, setPeople] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');
    getPeople()
      .then((res: Person[]) => {
        setPeople(res);
        setLoader(false);
        if (res.length === 0) {
          setErrorMessage('There is no data on the server');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setLoader(false);
      });
  }, []);

  const peopleExist = people !== undefined && people.length !== 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loader && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!loader && errorMessage && !peopleExist && (
            <p data-cy="noPeopleMessage">{errorMessage}</p>
          )}

          {peopleExist && (
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
                {people?.map(person => {
                  const motherExist = people.find(
                    pers => pers.name === person.motherName,
                  );
                  const fatherExist = people.find(
                    pers => pers.name === person.fatherName,
                  );

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>
                        <a href="">{person.sex}</a>
                      </td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName ? (
                          motherExist ? (
                            <PersonLink person={motherExist} />
                          ) : (
                            person.motherName
                          )
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {person.fatherName ? (
                          fatherExist ? (
                            <PersonLink person={fatherExist} />
                          ) : (
                            person.fatherName
                          )
                        ) : (
                          '-'
                        )}
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

export default PeoplePage;
