/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { getPeople } from '../../../api';
import { Loader } from '../../Loader';
import { PersonLink } from '../../PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {!!isLoading && (
            <Loader />
          )}

          {!!errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

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
                {people.map(person => {
                  let personMother: Person | string = '-';
                  let personFather: Person | string = '-';

                  if (person.motherName !== null) {
                    personMother = people.find(
                      mother => mother.name === person.motherName,
                    )
                      || person.motherName;
                  }

                  if (person.fatherName !== null) {
                    personFather = people.find(
                      mother => mother.name === person.fatherName,
                    )
                      || person.fatherName;
                  }

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {typeof personMother !== 'string'
                          ? (<PersonLink person={personMother} />)
                          : personMother}
                      </td>
                      <td>
                        {typeof personFather !== 'string'
                          ? (<PersonLink person={personFather} />)
                          : personFather}
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
