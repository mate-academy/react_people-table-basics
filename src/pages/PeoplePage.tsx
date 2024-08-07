import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/PersonList';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);

  const { slug: currentSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isNoPeople = !isLoading && !isError && !people.length;
  const isPeople = !isLoading && !isError && people.length;

  const renderMother = (mother: Person | null, motherName: string | null) => {
    if (mother) {
      return <PersonLink person={mother} />;
    }

    if (motherName) {
      return motherName;
    }

    return '-';
  };

  const renderFather = (father: Person | null, fatherName: string | null) => {
    if (father) {
      return <PersonLink person={father} />;
    }

    if (fatherName) {
      return fatherName;
    }

    return '-';
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isPeople && (
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
                  const { slug, sex, born, died, fatherName, motherName } =
                    person;

                  const mother =
                    people.find(p => p.name === motherName) || null;
                  const father =
                    people.find(p => p.name === fatherName) || null;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': slug === currentSlug,
                      })}
                    >
                      <td aria-label="Person">
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>

                      <td>{born}</td>

                      <td>{died}</td>

                      <td>{renderMother(mother, motherName)}</td>

                      <td>{renderFather(father, fatherName)}</td>
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
