import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { personId } = useParams();
  const selectedPersonId = personId;

  function getPeopleWithParents(peopleResponce: Person[]) {
    return peopleResponce.map(pers => ({
      ...pers,
      mother:
        peopleResponce.find(parent => parent.name === pers.motherName) ||
        pers.motherName,
      father:
        peopleResponce.find(parent => parent.name === pers.fatherName) ||
        pers.fatherName,
    }));
  }

  function getCellWithMothername(person: Person) {
    if (!person.motherName) {
      return '-';
    }

    if (typeof person.mother === 'string') {
      return person.motherName;
    }

    return (
      <Link to={person.mother?.slug} className="has-text-danger">
        {person.motherName}
      </Link>
    );
  }

  function getCellWithFathername(person: Person) {
    if (!person.fatherName) {
      return '-';
    }

    if (typeof person.father === 'string') {
      return person.fatherName;
    }

    return <Link to={person.father?.slug}>{person.fatherName}</Link>;
  }

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(response => setPeople(getPeopleWithParents(response)))
      .catch(() => setHasError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      {' '}
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isPeopleLoading ? (
            <Loader />
          ) : hasError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
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
                {people.map(pers => (
                  <tr
                    data-cy="person"
                    key={pers.slug}
                    className={cn({
                      'has-background-warning': selectedPersonId === pers.slug,
                    })}
                  >
                    <td>
                      <Link
                        to={pers.slug}
                        className={cn({ 'has-text-danger': pers.sex === 'f' })}
                      >
                        {pers.name}
                      </Link>
                    </td>

                    <td>{pers.sex}</td>
                    <td>{pers.born}</td>
                    <td>{pers.died}</td>
                    <td>{getCellWithMothername(pers)}</td>
                    <td>{getCellWithFathername(pers)}</td>
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
