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
      } catch (Error: any) {
        setError(`Can not load data from server:  ${Error.message as string | unknown}`);
      }
    };

    getPeoples();
  }, []);

  return (
    <>
      <h2>People Page</h2>
      {error
        ? <h2>{error}</h2>
        : peoples
          ? <PeopleTablePage peoples={peoples} />
          : (
            <Oval
              height="200"
              width="200"
              color="grey"
              ariaLabel="loading"
            />
          )}
    </>
  );
};
