import { IPeopleActions, IPeopleState } from './types';

export function reducer(
  state: IPeopleState,
  actions: IPeopleActions,
): IPeopleState {
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
