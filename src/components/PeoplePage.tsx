import { FC } from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';

type Props = {
  isLoader: boolean,
  people: Person[],
  isSelected: string | null,
  setIsSelected: (name: string | null) => void,
  error: string
};

export const PeoplePage: FC<Props> = ({
  isLoader,
  people,
  setIsSelected,
  isSelected,
  error,
}) => (
  <>
    <h1 className="title">People Page</h1>
    {isLoader
      ? <Loader />
      : (
        <PeopleTable
          people={people}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          error={error}
        />
      )}
  </>
);
