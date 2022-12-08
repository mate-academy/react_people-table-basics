import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonNavigate } from '../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const loadPeople = async () => {
    setIsLoad(true);

    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsEmpty(true);
      }

      setPeople(peopleFromServer);
    } catch (e) {
      setIsError(true);
    }

    setIsLoad(false);
    setIsEmpty(false);
  };

  const { getSlug = '' } = useParams();

  const findParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const getParent = people.find(parent => parent.name === parentName);

    return getParent ? <PersonNavigate person={getParent} /> : parentName;
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoad && (<Loader />)}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          { people.length > 0 && !isError && (
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
                  people.map(person => {
                    const {
                      sex,
                      born,
                      died,
                      fatherName,
                      motherName,
                      slug,
                    } = person;

                    return (
                      <tr
                        key={slug}
                        data-cy="person"
                        className={
                          classNames({
                            'has-background-warning': getSlug === slug,
                          })
                        }
                      >
                        <td>
                          <PersonNavigate person={person} />
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>{findParent(motherName)}</td>
                        <td>{findParent(fatherName)}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};
