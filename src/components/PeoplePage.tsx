import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PersonElement } from './PersonElement';
import { getPeople } from '../api';
import { Person } from '../types';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string>(
    localStorage.getItem('selectedPersonSlug') || '',
  );

  const { personSlug } = useParams<{ personSlug: string }>();

  const updatedPeople = people.map((child) => {
    if (!child.motherName && !child.fatherName) {
      return {
        ...child,
        motherName: '-',
        fatherName: '-',
      };
    }

    if (!child.fatherName) {
      return {
        ...child,
        fatherName: '-',
      };
    }

    if (!child.motherName) {
      return {
        ...child,
        motherName: '-',
      };
    }

    const father = people.find((parent) => parent.name === child.fatherName);
    const mother = people.find((parent) => parent.name === child.motherName);

    return {
      ...child,
      father,
      mother,
    };
  });

  const handleSelection = (slug: string) => {
    if (personSlug !== slug) {
      setSelectedSlug(slug);
    }

    localStorage.setItem('selectedPersonSlug', slug);
  };

  const fetchPeopleAsync = async () => {
    try {
      const fetchedData = await getPeople();

      setLoading(false);
      setPeople(fetchedData);
    } catch (error) {
      setLoadingError(true);
      throw new Error('Failed to fetch people');
    }
  };

  useEffect(() => {
    fetchPeopleAsync();
  }, []);

  useEffect(() => {
    if (personSlug && !people.some(person => person.slug === personSlug)) {
      setSelectedSlug('');
      localStorage.setItem('selectedPersonSlug', '');
    }
  }, [personSlug, people, window.location.href]);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">
            {loadingError ? (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            ) : (
              <>
                {!isLoading ? (
                  <table
                    data-cy="peopleTable"
                    className="table
                     is-striped is-hoverable is-narrow is-fullwidth"
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
                    {people.length === 0 ? (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    ) : (
                      <tbody>
                        {updatedPeople.map((person) => {
                          return (
                            <PersonElement
                              key={person.slug}
                              person={person}
                              handleSelection={handleSelection}
                              personSlug={selectedSlug}
                            />
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                ) : (
                  <Loader />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
