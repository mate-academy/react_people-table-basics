import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorsLoading, setIsErrorsLoading] = useState({
    serverError: false,
    noPeople: false,
  });

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);

        if (fetchedPeople.length === 0) {
          setIsErrorsLoading(prev => ({ ...prev, noPeople: true }));
        }
      } catch {
        setIsErrorsLoading(prev => ({ ...prev, serverError: true }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    if (isErrorsLoading.serverError || isErrorsLoading.noPeople) {
      return;
    }

    const timerId = setTimeout(() => {
      setIsErrorsLoading({ serverError: false, noPeople: false });
    }, 2000);

    return () => clearTimeout(timerId);
  }, [isErrorsLoading.serverError, isErrorsLoading.noPeople]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <Outlet context={{ people, isLoading, isErrorsLoading }} />
      </div>
    </div>
  );
};
