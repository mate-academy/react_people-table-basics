import React from 'react';
import { ReactNode, useMemo, useReducer } from 'react';
import { PeopleActions, PeopleState } from './PeopleStateAndActions';
import { PeopleContext } from './PeopleContext';

export function reducer(
  state: PeopleState,
  actions: PeopleActions,
): PeopleState {
  switch (actions.type) {
    case 'load':
      return {
        ...state,
        people: [...actions.payload],
      };

    default:
      return state;
  }
}

interface Props {
  children: ReactNode;
}

const initialState: PeopleState = {
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
