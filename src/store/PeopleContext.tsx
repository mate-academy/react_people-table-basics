// import React from 'react';
// import { Person } from '../types';
// import { getPeople } from '../api';

// export const PeopleContext = React.createContext<Promise<Person[]> | null>(
//   null,
// );

// type Props = {
//   children: React.ReactNode;
// };

// export const PeopleProvider: React.FC<Props> = ({ children }) => {
//   const value = getPeople();

//   return (
//     <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
//   );
// };
