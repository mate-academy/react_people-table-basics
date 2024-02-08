/* eslint-disable import/no-cycle */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Person } from './types';
import { getPeople } from './api';
import { PersonLink } from './PersonLink';
import { ParentLink } from './ParentLink';
import { Error } from './Error';
import { NoPeople } from './NoPeople';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { slug } = useParams();

  const normalizedPeople = people.map(person => {
    return {
      ...person,
      father: people.find(father => father.name === person.fatherName),
      mother: people.find(mother => mother.name === person.motherName),
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">

        <div className="box table-container">

          {isLoading && <Loader />}
          {error && <Error error={error} />}
          {people.length > 0 && (
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
                {normalizedPeople.map(({
                  name,
                  sex,
                  born,
                  died,
                  slug: slugCurrent,
                  mother,
                  father,
                  motherName,
                  fatherName,
                }) => (
                  <tr
                    data-cy="person"
                    key={slugCurrent}
                    className={classNames(
                      { 'has-background-warning': slug === slugCurrent },
                    )}
                  >
                    { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <td>
                      <PersonLink
                        name={name}
                        slugCurrent={slugCurrent}
                        sex={sex}
                      />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {
                        mother
                          && motherName
                          ? <ParentLink parent={mother} />
                          : motherName || '-'
                      }
                    </td>
                    <td>
                      {
                        father
                          && fatherName
                          ? <ParentLink parent={father} />
                          : fatherName || '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!people.length
            && !isLoading
            && !error
            && <NoPeople />}
        </div>
      </div>
    </>
  );
};
