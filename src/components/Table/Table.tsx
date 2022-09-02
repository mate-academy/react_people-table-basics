import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export const Table: React.FC = () => {
  const { personSlug } = useParams();
  const [people, setPeople] = useState<Person []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');

  const errMsg = 'Something went wrong';

  useEffect(() => {
    getPeople()
      .then((newPeople) => {
        setPeople(newPeople);
        if (newPeople.length === 0) {
          setInfoMsg('There are no people on the server');
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(
    () => people.map(person => {
      const newPerson = { ...person };
      const mother = people.find(currMother => (
        currMother.name === newPerson.motherName));
      const father = people.find(currFather => (
        currFather.name === newPerson.fatherName));

      if (mother) {
        newPerson.mother = mother;
      } else if (!newPerson.motherName) {
        newPerson.motherName = '-';
      }

      if (father) {
        newPerson.father = father;
      } else if (!newPerson.fatherName) {
        newPerson.fatherName = '-';
      }

      return newPerson;
    }),
    [people],
  );

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError
          ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errMsg}
            </p>
          )
          : (infoMsg.length > 0 && (
            <p data-cy="noPeopleMessage">
              {infoMsg}
            </p>
          ))}

        {preparedPeople.length > 0
          && (
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
                {preparedPeople.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames(
                      { 'has-background-warning': person.slug === personSlug },
                    )}
                  >
                    <td>
                      <Link
                        className={classNames(
                          { 'has-text-danger': person.sex === 'f' },
                        )}
                        to={`../${person.slug}`}
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
                            to={`../${person.mother.slug}`}
                            className="has-text-danger"
                          >
                            {person.mother.name}
                          </Link>
                        )
                        : person.motherName}
                    </td>
                    <td>
                      {person.father
                        ? (
                          <Link to={`../${person.father.slug}`}>
                            {person.father.name}
                          </Link>
                        )
                        : person.fatherName }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};
