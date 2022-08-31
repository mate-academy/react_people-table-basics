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

        {/* <tr data-cy="person">
          <td>
            <a href="#/people/philibert-haverbeke-1907">
              Philibert Haverbeke
            </a>
          </td>

          <td>m</td>
          <td>1907</td>
          <td>1997</td>

          <td>
            <a
              className="has-text-danger"
              href="#/people/emma-de-milliano-1876"
            >
              Emma de Milliano
            </a>
          </td>

          <td>
            <a href="#/people/emile-haverbeke-1877">
              Emile Haverbeke
            </a>
          </td>
        </tr>

        <tr data-cy="person" className="has-background-warning">
          <td>
            <a href="#/people/jan-frans-van-brussel-1761">
              Jan Frans van Brussel
            </a>
          </td>

          <td>m</td>
          <td>1761</td>
          <td>1833</td>
          <td>-</td>

          <td>
            <a href="#/people/jacobus-bernardus-van-brussel-1736">
              Jacobus Bernardus van Brussel
            </a>
          </td>
        </tr>

        <tr data-cy="person">
          <td>
            <a
              className="has-text-danger"
              href="#/people/lievijne-jans-1542"
            >
              Lievijne Jans
            </a>
          </td>

          <td>f</td>
          <td>1542</td>
          <td>1582</td>
          <td>-</td>
          <td>-</td>
        </tr>

        <tr data-cy="person">
          <td>
            <a href="#/people/bernardus-de-causmaecker-1721">
              Bernardus de Causmaecker
            </a>
          </td>

          <td>m</td>
          <td>1721</td>
          <td>1789</td>

          <td>
            <a
              className="has-text-danger"
              href="#/people/livina-haverbeke-1692"
            >
              Livina Haverbeke
            </a>
          </td>

          <td>
            <a href="#/people/lieven-de-causmaecker-1696">
              Lieven de Causmaecker
            </a>
          </td>
        </tr> */}
      </div>
    </div>
  );
};
