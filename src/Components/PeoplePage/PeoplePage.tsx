/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { getPeople } from '../../Api';
import { PeopleTablePage } from '../PeopleTablePage/PeopleTablePage';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<People[] | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getPeoples = async () => {
      try {
        const recivedPeoples = await getPeople();

        setPeoples(recivedPeoples);
      } catch (erro: any) {
        setError(`Can not load data from server:  ${erro.message}`);
      }
    };

    getPeoples();
  }, []);

  return (
    <>
      <h2>People Page</h2>
      {error
        ? <h1>{error}</h1>
        : peoples
          ? <PeopleTablePage peoples={peoples} />
          : (
            <Oval
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          )}
    </>
  );
};
