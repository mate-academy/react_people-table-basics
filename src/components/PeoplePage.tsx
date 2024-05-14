import { People } from './People';
import { PeopleTable } from './PeopleTable';
import React from 'react';

interface Props {
  loading: boolean;
  setLoading: (setLoader: boolean) => void;
}

export const PeoplePage: React.FC<Props> = ({ loading, setLoading }) => {
  return (
    <>
      <People />
      <PeopleTable setLoading={setLoading} loading={loading} />
    </>
  );
};
