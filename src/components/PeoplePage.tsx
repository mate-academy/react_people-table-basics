import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Link, useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';

type Props = {

};

export const PeoplePage: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isErrorOnServer, setIsErrorOnServer] = useState(false);
  const { slug } = useParams();

  const getPeopleList = async () => {
    try {
      const loadedPeople = await getPeople();

      setPeopleList(() => loadedPeople);
    } catch {
      setIsErrorOnServer(true);
    } finally {
      setLoading(false);
    }
  };

  const isNoDataOnServer = !loading && !peopleList.length;

  useEffect(() => {
    getPeopleList();
  }, []);

  const getParent = (parentName: string | null) => {
    const parent = peopleList.find(person => person.name === parentName);

    if (!parentName) {
      return '-';
    }

    return parent
      ? (
        <Link
          className={cn(
            { 'has-text-danger': parent.sex === 'f' },
          )}
          to={parent.slug}
        >
          {parentName}
        </Link>
      ) : `${parentName}`;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading
            ? <Loader />
            : (
              <>
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable
                   is-narrow is-fullwidth"
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
                    {peopleList.map(person => (
                      <tr
                        key={person.slug}
                        className={cn(
                          { 'has-background-warning': person.slug === slug },
                        )}
                        data-cy="person"
                      >
                        <td>
                          <Link
                            to={person.slug}
                            className={cn(
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
                          {getParent(person.motherName)}

                        </td>

                        <td>
                          {getParent(person.fatherName)}

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {isErrorOnServer && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {isNoDataOnServer && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
