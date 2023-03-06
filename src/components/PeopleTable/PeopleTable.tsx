import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { warningTimer } from '../../utils/warningTimer';

type Props = {
  selectedPersonSlug: string;
};

export const TodosTable: FC<Props> = ({ selectedPersonSlug }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoadingPerson, setIsLoadingPerson] = useState(false);
  const [isHasError, setIsHasError] = useState(false);

  const isSelected = (person: Person) => person.slug === selectedPersonSlug;

  const findPersonParents = (personParent: string | null) => {
    return people.find(person => personParent === person.name);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingPerson(true);
        const todosData = await getPeople();

        setPeople(todosData);
      } catch (error) {
        setIsHasError(true);
        warningTimer(setIsHasError, false, 3000);
      } finally {
        setIsLoadingPerson(false);
      }
    })();
  }, [isHasError]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoadingPerson && <Loader />}

        {isHasError && !isLoadingPerson && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoadingPerson && !people.length && !isHasError && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!isLoadingPerson && people.length ? (
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
                const preparedMotherName = person.motherName || '-';
                const preparedFatherName = person.fatherName || '-';
                const mother = findPersonParents(person.motherName);
                const father = findPersonParents(person.fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={`${person.name}`}
                    className={classNames(
                      { 'has-background-warning': isSelected(person) },
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
                      {mother
                        ? (
                          <Link
                            to={`../${mother?.slug}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </Link>
                        ) : preparedMotherName}
                    </td>

                    <td>
                      {father
                        ? (
                          <Link to={`../${father?.slug}`}>
                            {person.fatherName}
                          </Link>
                        ) : preparedFatherName}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};
