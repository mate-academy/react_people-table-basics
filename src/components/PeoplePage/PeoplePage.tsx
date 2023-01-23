import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[] | []>([]);
  const [notification, setNotification] = useState('');
  const [isLoad, setIsLoad] = useState(true);
  const { slug } = useParams();

  const loadPerson = async () => {
    try {
      const Persons = await getPeople();

      if (!Persons.length) {
        setNotification('Empty list');
      }

      setPersons(Persons);
    } catch {
      setNotification('Request error');
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    loadPerson();
  }, []);

  const renderBody = () => {
    switch (notification) {
      case 'Request error':
        return (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        );
      case 'Empty list':
        return (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        );
      case '':
      default:
        return <PeopleTable persons={persons} slug={slug} />;
    }
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoad
            ? (<Loader />)
            : renderBody()}
        </div>
      </div>
    </div>
  );
};
