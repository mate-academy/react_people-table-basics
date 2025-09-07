import 'bulma/css/bulma.css';
import { useEffect, useState } from 'react';
import { Table } from '../components/Table/Table';
// import { dataContext } from '../components/dataContext/dataContext';
import { Loader } from '../components/Loader';
import { preparePeopleData } from '../utils/preparePeopleData';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  // const { dataFromServer, errorMessage, isLoading } = useContext(dataContext)!;
  const [dataFromServer, setDataFromServer] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setDataFromServer([]);
    setErrorMessage(null);
    setIsLoading(true);
    getPeople()
      .then((data: Person[]) => {
        const peopleData = preparePeopleData(data);

        setDataFromServer(peopleData);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        {errorMessage}
      </p>
    );
  }

  if (dataFromServer?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <Table people={dataFromServer} isLoading={isLoading} />
    </>
  );
};
