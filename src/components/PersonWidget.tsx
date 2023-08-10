import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import PersonTable from './PersonTable';

const getPerson = (
  name: string, peopleFromApi: Person[],
): Person | undefined => {
  return peopleFromApi.find(person => person.name === name);
};

const PersonWidget:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const peopleFromApi = await getPeople();

        setPeople(peopleFromApi.map(person => ({
          ...person,
          mother: getPerson(person.motherName || '', peopleFromApi),
          father: getPerson(person.fatherName || '', peopleFromApi),
        })));
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <PersonTable people={people} />
  );
};

export default PersonWidget;
