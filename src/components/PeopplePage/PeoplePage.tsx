import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug: selectedPersonSlug } = useParams();

  useEffect(() => {
    const getPeopleFromServer = async () => {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map(person => {
        const newPerson = { ...person };

        const mother = peopleFromServer.find(human => (
          human.name === person.motherName));

        const father = peopleFromServer.find(human => (
          human.name === person.fatherName
        ));

        if (mother) {
          newPerson.mother = mother;
        }

        if (father) {
          newPerson.father = father;
        }

        return newPerson;
      });

      setPeople(peopleWithParents);
    };

    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {people.length
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
              {people.map(person => {
                const isSelected = person.slug === selectedPersonSlug;

                return (
                  <tr
                    data-cy="person"
                    className={classNames(
                      { 'has-background-warning': isSelected },
                    )}
                  >
                    <td>
                      <Link
                        to={`../${person.slug}`}
                        className={classNames(
                          { 'has-text-danger': person.sex === 'f' },
                        )}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother
                        ? (
                          <Link
                            to={`../${person.mother?.slug}`}
                            className={classNames(
                              { 'has-text-danger': person.mother.sex === 'f' },
                            )}
                          >
                            {person.mother?.name}
                          </Link>
                        )
                        : person.motherName || '-'}
                    </td>
                    <td>
                      {person.father
                        ? (
                          <Link
                            to={`../${person.father?.slug}`}
                          >
                            {person.father?.name}
                          </Link>
                        )
                        : person.fatherName || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        )
        : (
          <div className="block">
            <div className="box table-container">
              <Loader />

              {/* <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>

                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p> */}

            </div>
          </div>
        )}
    </>
  );
};
