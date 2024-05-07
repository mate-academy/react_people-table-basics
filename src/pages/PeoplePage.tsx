import { useContext } from 'react';
import { PeopleTable } from '../components/Loader/PeopleTable';
import { PeopleContext } from '../stores/PeopleProvider';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const { people, loader, notification } = useContext(PeopleContext);

  return (
    <>
      {!loader ? <PeopleTable people={people} /> : <Loader />}
      {notification && <p data-cy="noPeopleMessage">{notification}</p>}
    </>
  );
};
