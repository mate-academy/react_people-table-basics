/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../../components/PersonLink/PersonLink';

const findParent = (
  people: Person[],
  parentName: string | null,
): Person | null => {
  if (parentName) {
    return people.find(person => person.name === parentName) || null;
  }

  return null;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { selectedSlug } = useParams<{ selectedSlug: string }>();

  useEffect(() => {
    getPeople().then((res) => {
      const personAndParents: Person[] = res.map(person => ({
        ...person,
        mother: findParent(res, person.motherName),
        father: findParent(res, person.fatherName),
      }));

      setPeople(personAndParents);
      setIsLoading(false);
    }).catch(() => {
      setHasError(true);
    });
  }, []);

  const peopleElements = people?.map(person => {
    const {
      sex,
      born,
      died,
      mother,
      father,
      slug,
    } = person;

    return (
      <tr
        data-cy="person"
        key={slug}
        className={classNames({
          'has-background-warning': slug === selectedSlug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother
            ? <PersonLink person={mother} />
            : (person.motherName || '-')}
        </td>
        <td>
          {father
            ? <PersonLink person={father} />
            : (person.fatherName || '-')}
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : !people?.length ? (
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

              <tbody>{peopleElements}</tbody>
            </table>
          )}

        </div>
      </div>
    </>
  );
};
