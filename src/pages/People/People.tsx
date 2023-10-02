import { FC } from 'react';
// import { Loader } from '../../components/Loader';
import { Title } from '../../components/Title';
import { Table } from '../../components/Table';

type TPeopleProps = {};

export const People: FC<TPeopleProps> = () => {
  return (
    <>
      <Title>People Page</Title>

      <Table />
    </>
  );
};

/* <Loader />

<p data-cy="peopleLoadingError" className="has-text-danger">
  Something went wrong
</p>

<p data-cy="noPeopleMessage">
  There are no people on the server
</p> */
