import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug = '' } = useParams();
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchPeople = async () => {
    try {
      const data = await getPeople();

      const peopleWithParents = data.map(person => ({
        ...person,
        mother: data.find(pers => pers.name === person.motherName),
        father: data.find(pers => pers.name === person.fatherName),
      }));

      setPeople(peopleWithParents);
    } catch (error) {
      setErrorText('Something went wrong');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {(isLoading && (<Loader />))}

          {!people.length && errorText && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !errorText && !isLoading
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && <PeopleTable people={people} slug={slug} />}

        </div>
      </div>
    </>
  );
};
