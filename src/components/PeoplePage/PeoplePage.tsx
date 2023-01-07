import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { personSlug = '' } = useParams();

  function findParent(name: string) {
    return peopleList.find(person => person.name === name);
  }

  function getParent() {
    return peopleList.map(person => ({
      ...person,
      fatherName: person.fatherName ? person.fatherName : '-',
      motherName: person.motherName ? person.motherName : '-',
      father: person.fatherName ? findParent(person.fatherName) : null,
      mother: person.motherName ? findParent(person.motherName) : null,
    }));
  }

  async function loadingPeople() {
    setIsLoading(true);
    const peopleFromServer = await getPeople();

    try {
      setPeopleList(peopleFromServer);
      setIsShowError(false);
    } catch {
      setIsShowError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadingPeople();
  }, []);

  const people = useMemo(() => {
    return getParent();
  }, [peopleList]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isShowError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !peopleList.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {Boolean(people.length) && (
            <table
              data-cy="peopleTable"
              className={'table is-striped is-hoverable'
                + 'is-narrow is-fullwidth'}
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
                <PeopleTable
                  people={people}
                  personSlug={personSlug}
                />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
