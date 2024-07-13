import { ReactNode, useMemo, useReducer } from 'react';
import { PeopleContext } from '../lib/PeopleContext';
import { reducer } from '../lib/reducer';
import { IPeopleState } from '../lib/types';

interface Props {
  children: ReactNode;
}

const initialState: IPeopleState = {
  people: [],
};

export const PeopleProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
