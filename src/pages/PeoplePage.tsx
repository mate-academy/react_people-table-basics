import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { TableHeaders } from '../types/TableHeaders';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>('');
  const { slug } = useParams();

  const handleSelectPerson = (selectedSlug: string) => {
    setSelectedPersonSlug(selectedSlug);
  };

  const getParent = (parentName: string | null) => {
    return people.find((parent) => parent.name === parentName);
  };

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
        if (slug) {
          setSelectedPersonSlug(slug);
        }
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, [slug]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!isLoading && !errorMessage && people.length === 0 && (
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
                  {Object.values(TableHeaders).map((header) => (
                    <th key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      'has-background-warning':
                      person.slug === selectedPersonSlug,
                    })}
                  >
                    <td>
                      <PersonLink
                        person={person}
                        onSelect={handleSelectPerson}
                      />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {getParent(person.motherName) ? (
                        <PersonLink
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          person={getParent(person.motherName)!}
                          onSelect={handleSelectPerson}
                        />
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td>
                      {getParent(person.fatherName) ? (
                        <PersonLink
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          person={getParent(person.fatherName)!}
                          onSelect={handleSelectPerson}
                        />
                      ) : (
                        person.fatherName || '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
