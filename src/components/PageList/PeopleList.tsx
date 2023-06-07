import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';

export const PeopleList = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [showError, setShowError] = useState(false);
  const [isNoPeopleMessage, setIsNoPeopleMessage] = useState(false);
  const [isProcessing, setIsProcesing] = useState(false);
  const Slug = useParams();

  const findPerson = (personName: string | null, response: Person[]) => {
    return response.find((person: Person) => person.name === personName);
  };

  const setPerson = (response: Person[]) => {
    setPeopleList(response.map(person => {
      return {
        ...person,
        motherName: person.motherName || '-',
        fatherName: person.fatherName || '-',
        mother: findPerson(person.motherName, response),
        father: findPerson(person.fatherName, response),
      };
    }));
  };

  useEffect(() => {
    setIsProcesing(true);
    getPeople()
      .then((response) => {
        setPerson(response);
        if (!response.length) {
          setIsNoPeopleMessage(true);
        }
      })
      .catch(() => setShowError(true))
      .finally(() => setIsProcesing(false));
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isProcessing && <Loader />}

        {showError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isNoPeopleMessage && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {peopleList.length > 0 && (
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
              {peopleList.map(({
                name,
                sex,
                born,
                died,
                mother,
                father,
                motherName,
                fatherName,
                slug,
              }) => (
                <tr
                  key={name}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': `${Slug.slug}` === slug,
                  })}
                >
                  <td>
                    <Link
                      className={cn({ 'has-text-danger': sex === 'f' })}
                      to={`/people/${slug}`}
                    >
                      {name}
                    </Link>
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother
                      ? (
                        <Link
                          to={`/people/${mother.slug}`}
                          className="has-text-danger"
                        >
                          {motherName}
                        </Link>
                      )
                      : motherName}
                  </td>

                  <td>
                    {father
                      ? (
                        <Link
                          to={`/people/${father.slug}`}
                        >
                          {fatherName}
                        </Link>
                      )
                      : fatherName}
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
