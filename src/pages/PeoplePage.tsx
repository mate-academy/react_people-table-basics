import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../utils/api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { TypeErroros } from '../types/Error';

export const PeoplePage: React.FC = () => {
  const [chekError, setChekError] = useState(TypeErroros.start);
  const { peopleSlug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setChekError(TypeErroros.waitLoading);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);

        if (peopleFromServer.length === 0) {
          setChekError(TypeErroros.noPeople);
        } else {
          setChekError(TypeErroros.start);
        }
      })
      .catch(() => {
        setChekError(TypeErroros.loadingError);
      });
  }, []);

  function findParenth(motherName: string) {
    const parenth = people.find(human => human.name === motherName);

    if (parenth) {
      return <PersonLink person={parenth} />;
    }

    return motherName;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {chekError === TypeErroros.waitLoading && <Loader />}

          {chekError === TypeErroros.loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {chekError === TypeErroros.noPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {chekError === TypeErroros.start && (
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
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': person.slug === peopleSlug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? findParenth(person.motherName) : '-'}
                    </td>
                    <td>
                      {person.fatherName ? findParenth(person.fatherName) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
