import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string>();
  // eslint-disable-next-line
  const [highlightedParentName, setHighlightedParentName] = useState<string | null>(null);
  const { peopleId } = useParams();

  const allNames = peopleData.map(person => person.name || '');

  const isMotherNameInList = (motherName: string | null) => {
    if (motherName === null) {
      return false;
    }

    return allNames.includes(motherName);
  };

  const isFatherNameInList = (fatherName: string | null) => {
    if (fatherName === null) {
      return false;
    }

    return allNames.includes(fatherName);
  };

  const handleHighlightParentName = (parentName: string | null) => {
    setHighlightedParentName(parentName);
  };

  const handlePersonClick = (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setSelectedPersonId(id);
  };

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleData(people);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoading && !hasError && !peopleData.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            {!isLoading && (
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
            )}
            {!isLoading && !hasError && peopleData && (
              <tbody>
                {peopleData.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning':
                        person.slug === selectedPersonId ||
                        person.name === highlightedParentName,
                    })}
                  >
                    <td>
                      <PersonLink
                        person={person}
                        handleClick={handlePersonClick}
                      />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {isMotherNameInList(person.motherName) || peopleId ? (
                      <td>
                        <Link
                          onClick={() =>
                            handleHighlightParentName(person.motherName)
                          }
                          to={`../${person.slug}`}
                          className={
                            isMotherNameInList(person.motherName)
                              ? 'has-text-danger'
                              : ''
                          }
                        >
                          {person.motherName}
                        </Link>
                      </td>
                    ) : (
                      <td>{person.motherName || '-'}</td>
                    )}

                    {isFatherNameInList(person.fatherName) || peopleId ? (
                      <td>
                        <Link
                          onClick={() =>
                            handleHighlightParentName(person.fatherName)
                          }
                          to={`../${person.slug}`}
                          className={
                            isFatherNameInList(person.fatherName)
                              ? 'has-text-link'
                              : ''
                          }
                        >
                          {person.fatherName}
                        </Link>
                      </td>
                    ) : (
                      <td>{person.fatherName || '-'}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
