import React from 'react';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import PersonItem from '../PersonItem/PersonItem';
import { useParams } from 'react-router-dom';

const PeopleContent: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);

      try {
        const data: Person[] = await getPeople();

        const dataWithParents: Person[] = data.map(person => {
          const mother = data.find(p => p.name === person.motherName);
          const father = data.find(p => p.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeopleList(dataWithParents);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {error}
      </p>
    );
  }

  if (peopleList.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
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
        {peopleList.map(person => {
          let personMatch = false;

          if (slug && person.slug === slug) {
            personMatch = true;
          }

          return (
            <PersonItem
              key={person.slug}
              person={person}
              personMatch={personMatch}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleContent;
