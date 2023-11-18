import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from './Loader';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { personId } = useParams();
  // const selectedPerson = people.find(person => person.slug === personId);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);

  const loadPeople = async () => {
    setIsPeopleLoading(true);

    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch {
      setErrorMessage(true);
    } finally {
      setIsPeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const isMotherExistInList = (motherName?: string | null) => {
    return people.find(person => person.name === motherName);
  };

  const isFatherExistInList = (fatherName?: string | null) => {
    return people.find(person => person.name === fatherName);
  };

  const getParent = (person: Person, parentType: 'father' | 'mother') => {
    const parentTypeName = parentType === 'mother'
      ? 'motherName'
      : 'fatherName';

    if (!person[parentTypeName]) {
      return <td>-</td>;
    }

    const foundPerson = parentType === 'mother'
      ? isMotherExistInList(person[parentTypeName])
      : isFatherExistInList(person[parentTypeName]);

    if (foundPerson) {
      return (
        <td>
          <Link
            className={cn({
              'has-text-danger': foundPerson.sex === 'f',
            })}
            to={`/people/${foundPerson.slug}`}
          >
            {foundPerson.name}
          </Link>
        </td>
      );
    }

    return (
      <td>
        {person[parentTypeName]}
      </td>
    );
  };

  // console.log(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      {/* {isPeopleLoaded && !isPeopleLoading */}
      {isPeopleLoading && (<Loader />)}

      {!isPeopleLoading && !errorMessage && (
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

          {people.map(person => (
            <tbody
              key={person.slug}
            >
              <tr
                data-cy="person"
                className={cn({
                  'has-background-warning':
                  person.slug === personId,
                })}
              >
                <td>
                  <Link
                    to={`/people/${person.slug}`}
                    className={cn({
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {getParent(person, 'mother')}
                {getParent(person, 'father')}
              </tr>

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
            </tr> */}

              {/* <tr data-cy="person" className="has-background-warning">
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
            </tbody>
          ))}
        </table>
      )}

      <div className="block">
        <div className="box table-container">

          {errorMessage && !isPeopleLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isPeopleLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
